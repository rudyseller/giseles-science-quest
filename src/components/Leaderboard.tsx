import { useState, useEffect } from 'react'
import { getLeaderboard, type LeaderboardEntry } from '../utils/supabase'
import { topics } from './topics'

interface Props {
  onBack: () => void
  currentPlayer: string
}

export default function Leaderboard({ onBack, currentPlayer }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard().then(data => {
      setEntries(data)
      setLoading(false)
    })
  }, [])

  // Calculate per-topic best for each player
  function getBest(player: string, topicId: string): LeaderboardEntry | undefined {
    return entries.find(e => e.player_name === player && e.topic_id === topicId)
  }

  // Overall stats
  function getOverall(player: string) {
    const playerEntries = entries.filter(e => e.player_name === player)
    if (playerEntries.length === 0) return { avg: 0, totalAttempts: 0, topicsPlayed: 0 }
    const topicBests = topics.map(t => getBest(player, t.id)?.best_percentage || 0)
    const played = topicBests.filter(p => p > 0).length
    const avg = played > 0 ? Math.round(topicBests.reduce((a, b) => a + b, 0) / topics.length) : 0
    const totalAttempts = playerEntries.reduce((a, e) => a + e.attempts, 0)
    return { avg, totalAttempts, topicsPlayed: played }
  }

  const gisele = getOverall('Gisele')
  const janco = getOverall('Janco')
  const giseleWinning = gisele.avg > janco.avg
  const jancoWinning = janco.avg > gisele.avg
  const tied = gisele.avg === janco.avg

  return (
    <div className="px-4 pt-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-white flex-1">Leaderboard</h2>
      </div>

      {loading ? (
        <div className="card text-center py-8">
          <div className="text-2xl mb-2">Loading...</div>
        </div>
      ) : (
        <>
          {/* Who's winning */}
          <div className="card text-center mb-4">
            <div className="text-4xl mb-2">
              {tied ? '🤝' : giseleWinning ? '👩‍🔬' : '👨‍🔬'}
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {tied && gisele.avg === 0 ? 'No scores yet — start a quiz!' :
               tied ? "It's a tie!" :
               giseleWinning ? 'Gisele is winning!' : 'Janco is winning!'}
            </h3>
            {(gisele.avg > 0 || janco.avg > 0) && (
              <p className="text-sm text-gray-500 mt-1">
                {gisele.avg}% vs {janco.avg}% overall
              </p>
            )}
          </div>

          {/* Overall comparison */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`card text-center ${currentPlayer === 'Gisele' ? 'ring-2 ring-pink-400' : ''}`}>
              <div className="text-2xl mb-1">👩‍🔬</div>
              <h4 className="font-bold text-pink-600">Gisele</h4>
              <div className="text-3xl font-bold text-gray-800">{gisele.avg}%</div>
              <p className="text-[10px] text-gray-400">{gisele.totalAttempts} quizzes · {gisele.topicsPlayed}/6 topics</p>
            </div>
            <div className={`card text-center ${currentPlayer === 'Janco' ? 'ring-2 ring-indigo-400' : ''}`}>
              <div className="text-2xl mb-1">👨‍🔬</div>
              <h4 className="font-bold text-indigo-600">Janco</h4>
              <div className="text-3xl font-bold text-gray-800">{janco.avg}%</div>
              <p className="text-[10px] text-gray-400">{janco.totalAttempts} quizzes · {janco.topicsPlayed}/6 topics</p>
            </div>
          </div>

          {/* Per-topic breakdown */}
          <div className="card">
            <h4 className="font-bold text-sm text-gray-700 mb-3">Topic Breakdown</h4>
            <div className="space-y-3">
              {topics.map(topic => {
                const g = getBest('Gisele', topic.id)
                const j = getBest('Janco', topic.id)
                const gPct = g?.best_percentage || 0
                const jPct = j?.best_percentage || 0
                return (
                  <div key={topic.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{topic.emoji}</span>
                      <span className="text-xs font-bold text-gray-700 flex-1">{topic.title}</span>
                    </div>
                    {/* Gisele bar */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-pink-500 w-12 text-right">Gisele</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${gPct}%`, background: '#ec4899' }}
                        />
                      </div>
                      <span className="text-[10px] font-bold w-8 text-right" style={{ color: gPct >= jPct && gPct > 0 ? '#ec4899' : '#9ca3af' }}>
                        {gPct > 0 ? `${gPct}%` : '—'}
                      </span>
                    </div>
                    {/* Janco bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-indigo-500 w-12 text-right">Janco</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${jPct}%`, background: '#6366f1' }}
                        />
                      </div>
                      <span className="text-[10px] font-bold w-8 text-right" style={{ color: jPct >= gPct && jPct > 0 ? '#6366f1' : '#9ca3af' }}>
                        {jPct > 0 ? `${jPct}%` : '—'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
