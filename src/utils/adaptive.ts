export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AdaptiveState {
  currentDifficulty: Difficulty;
  streak: number; // consecutive correct at current difficulty
  questionsAnswered: number;
  correctAnswers: number;
  difficultyHistory: Difficulty[];
}

export function createAdaptiveState(): AdaptiveState {
  return {
    currentDifficulty: 'easy',
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    difficultyHistory: [],
  };
}

export function updateAdaptive(state: AdaptiveState, correct: boolean): AdaptiveState {
  const next = { ...state };
  next.questionsAnswered++;
  next.difficultyHistory.push(state.currentDifficulty);

  if (correct) {
    next.correctAnswers++;
    next.streak++;

    // Two correct in a row → move up
    if (next.streak >= 2) {
      if (next.currentDifficulty === 'easy') {
        next.currentDifficulty = 'medium';
        next.streak = 0;
      } else if (next.currentDifficulty === 'medium') {
        next.currentDifficulty = 'hard';
        next.streak = 0;
      }
      // Already at hard, stay there
    }
  } else {
    next.streak = 0;
    // One wrong → move down
    if (next.currentDifficulty === 'hard') {
      next.currentDifficulty = 'medium';
    } else if (next.currentDifficulty === 'medium') {
      next.currentDifficulty = 'easy';
    }
  }

  return next;
}

export function getScoreMessage(pct: number): string {
  if (pct >= 90) return "Amazing! You've nailed this! 🌟";
  if (pct >= 75) return "Great job! Almost mastered! 💪";
  if (pct >= 60) return "Good effort! Getting there! 📈";
  if (pct >= 40) return "Keep practising, you're improving! 🔬";
  return "Don't worry, review the learn section and try again! 📚";
}

export function getDifficultyColor(d: Difficulty): string {
  switch (d) {
    case 'easy': return '#34d399';
    case 'medium': return '#fbbf24';
    case 'hard': return '#ef4444';
  }
}

export function getDifficultyLabel(d: Difficulty): string {
  switch (d) {
    case 'easy': return 'Easy';
    case 'medium': return 'Medium';
    case 'hard': return 'Hard';
  }
}
