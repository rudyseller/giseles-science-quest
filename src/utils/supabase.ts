import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qwjzncjarnacexgofebj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3anpuY2phcm5hY2V4Z29mZWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMTc5MDUsImV4cCI6MjA5MTg5MzkwNX0.eb7KoIeOEdljhDlwsn5crkopVJYym8wcUJawculQ5IA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ScoreRow {
  id: string
  player_name: string
  topic_id: string
  score: number
  total: number
  percentage: number
  difficulty_reached: string
  created_at: string
}

export async function submitScore(
  playerName: string,
  topicId: string,
  score: number,
  total: number,
  percentage: number,
  difficultyReached: string,
) {
  try {
    await supabase.from('science_quest_scores').insert({
      player_name: playerName,
      topic_id: topicId,
      score,
      total,
      percentage,
      difficulty_reached: difficultyReached,
    })
  } catch (e) {
    console.warn('Failed to submit score:', e)
  }
}

export interface LeaderboardEntry {
  player_name: string
  topic_id: string
  best_percentage: number
  best_difficulty: string
  attempts: number
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('science_quest_scores')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []

    // Group by player + topic, take best percentage
    const map = new Map<string, LeaderboardEntry>()
    for (const row of data as ScoreRow[]) {
      const key = `${row.player_name}:${row.topic_id}`
      const existing = map.get(key)
      if (!existing) {
        map.set(key, {
          player_name: row.player_name,
          topic_id: row.topic_id,
          best_percentage: row.percentage,
          best_difficulty: row.difficulty_reached,
          attempts: 1,
        })
      } else {
        existing.attempts++
        if (row.percentage > existing.best_percentage) {
          existing.best_percentage = row.percentage
          existing.best_difficulty = row.difficulty_reached
        }
      }
    }
    return Array.from(map.values())
  } catch (e) {
    console.warn('Failed to fetch leaderboard:', e)
    return []
  }
}

// Player name management
const PLAYER_KEY = 'science-quest-player'

export function getPlayerName(): string | null {
  return localStorage.getItem(PLAYER_KEY)
}

export function setPlayerName(name: string) {
  localStorage.setItem(PLAYER_KEY, name)
}

export function clearPlayerName() {
  localStorage.removeItem(PLAYER_KEY)
}
