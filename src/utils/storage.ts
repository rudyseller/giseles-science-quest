const STORAGE_KEY = 'gisele-science-quest';

export interface TopicProgress {
  totalAttempted: number;
  totalCorrect: number;
  easyCorrect: number;
  easyAttempted: number;
  mediumCorrect: number;
  mediumAttempted: number;
  hardCorrect: number;
  hardAttempted: number;
  highestDifficulty: 'easy' | 'medium' | 'hard';
  lastPlayed: string | null;
}

export interface GameProgress {
  topics: Record<string, TopicProgress>;
}

const defaultTopicProgress: TopicProgress = {
  totalAttempted: 0,
  totalCorrect: 0,
  easyCorrect: 0,
  easyAttempted: 0,
  mediumCorrect: 0,
  mediumAttempted: 0,
  hardCorrect: 0,
  hardAttempted: 0,
  highestDifficulty: 'easy',
  lastPlayed: null,
};

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { topics: {} };
}

export function saveProgress(progress: GameProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getTopicProgress(topicId: string): TopicProgress {
  const progress = loadProgress();
  return progress.topics[topicId] || { ...defaultTopicProgress };
}

export function updateTopicProgress(topicId: string, update: Partial<TopicProgress>) {
  const progress = loadProgress();
  const current = progress.topics[topicId] || { ...defaultTopicProgress };
  progress.topics[topicId] = { ...current, ...update };
  saveProgress(progress);
}

export function recordQuizResult(
  topicId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  correct: number,
  total: number
) {
  const progress = loadProgress();
  const current = progress.topics[topicId] || { ...defaultTopicProgress };

  current.totalAttempted += total;
  current.totalCorrect += correct;
  current[`${difficulty}Attempted`] += total;
  current[`${difficulty}Correct`] += correct;

  if (difficulty === 'hard' && current.highestDifficulty !== 'hard') current.highestDifficulty = 'hard';
  else if (difficulty === 'medium' && current.highestDifficulty === 'easy') current.highestDifficulty = 'medium';

  current.lastPlayed = new Date().toISOString();
  progress.topics[topicId] = current;
  saveProgress(progress);
}

export function getMastery(topicId: string): number {
  const p = getTopicProgress(topicId);
  if (p.totalAttempted === 0) return 0;
  const easyWeight = 1;
  const mediumWeight = 2;
  const hardWeight = 3;
  const weighted =
    (p.easyCorrect * easyWeight + p.mediumCorrect * mediumWeight + p.hardCorrect * hardWeight);
  const maxWeighted =
    (p.easyAttempted * easyWeight + p.mediumAttempted * mediumWeight + p.hardAttempted * hardWeight);
  if (maxWeighted === 0) return 0;
  return Math.round((weighted / maxWeighted) * 100);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
