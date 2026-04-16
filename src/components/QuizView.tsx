import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTopicById } from './topics'
import { getQuestionsByTopic, type Question } from '../data/questions'
import { createAdaptiveState, updateAdaptive, getScoreMessage, getDifficultyColor, getDifficultyLabel, type AdaptiveState, type Difficulty } from '../utils/adaptive'
import { recordQuizResult } from '../utils/storage'
import { submitScore } from '../utils/supabase'

interface Props {
  topicId: string
  playerName: string
  onBack: () => void
  onHome: () => void
}

const TOTAL_QUESTIONS = 10

/** Pick a question at the given difficulty, avoiding already-used IDs. Falls back to other difficulties. */
function pickQuestion(
  allQuestions: Question[],
  difficulty: Difficulty,
  usedIds: Set<string>,
): Question | null {
  // Try preferred difficulty first
  const atDiff = allQuestions.filter(q => q.difficulty === difficulty && !usedIds.has(q.id))
  if (atDiff.length > 0) return atDiff[Math.floor(Math.random() * atDiff.length)]

  // Fallback: try adjacent difficulties
  const fallbackOrder: Difficulty[] =
    difficulty === 'easy' ? ['medium', 'hard'] :
    difficulty === 'hard' ? ['medium', 'easy'] :
    ['easy', 'hard']

  for (const d of fallbackOrder) {
    const atFallback = allQuestions.filter(q => q.difficulty === d && !usedIds.has(q.id))
    if (atFallback.length > 0) return atFallback[Math.floor(Math.random() * atFallback.length)]
  }

  // Last resort: any unused question
  const any = allQuestions.filter(q => !usedIds.has(q.id))
  if (any.length > 0) return any[Math.floor(Math.random() * any.length)]

  return null
}

export default function QuizView({ topicId, playerName, onBack, onHome }: Props) {
  const topic = getTopicById(topicId)
  const allTopicQuestions = useMemo(() => getQuestionsByTopic(topicId), [topicId])

  // Pre-build the first question
  const firstQuestion = useMemo(() => {
    const shuffled = allTopicQuestions.filter(q => q.difficulty === 'easy')
    if (shuffled.length > 0) return shuffled[Math.floor(Math.random() * shuffled.length)]
    return allTopicQuestions[0]
  }, [allTopicQuestions])

  // Stable question sequence - built as we go, stored in state
  const [questionSequence, setQuestionSequence] = useState<Question[]>(firstQuestion ? [firstQuestion] : [])
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set(firstQuestion ? [firstQuestion.id] : []))
  const [adaptive, setAdaptive] = useState<AdaptiveState>(createAdaptiveState)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)
  const [difficultyResults, setDifficultyResults] = useState<Record<string, { correct: number; total: number }>>({
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  })

  const currentQuestion = questionSequence[currentIdx]

  const handleAnswer = useCallback((optionIdx: number) => {
    if (selected !== null || !currentQuestion) return
    setSelected(optionIdx)
    setShowExplanation(true)

    const correct = optionIdx === currentQuestion.correctIndex
    const newAdaptive = updateAdaptive(adaptive, correct)
    // Don't update adaptive state yet - wait for "Next Question" to avoid re-renders changing the question
    setAdaptive(newAdaptive)

    setDifficultyResults(prev => {
      const d = currentQuestion.difficulty
      return {
        ...prev,
        [d]: { correct: prev[d].correct + (correct ? 1 : 0), total: prev[d].total + 1 },
      }
    })

    // Pre-pick the next question at the NEW difficulty (so it's ready when they click Next)
    const nextQ = pickQuestion(allTopicQuestions, newAdaptive.currentDifficulty, usedIds)
    if (nextQ) {
      setQuestionSequence(prev => [...prev, nextQ])
      setUsedIds(prev => new Set([...prev, nextQ.id]))
    }
  }, [selected, currentQuestion, adaptive, allTopicQuestions, usedIds])

  function nextQuestion() {
    if (currentIdx + 1 >= TOTAL_QUESTIONS || !questionSequence[currentIdx + 1]) {
      // Save results locally
      for (const [diff, result] of Object.entries(difficultyResults)) {
        if (result.total > 0) {
          recordQuizResult(topicId, diff as any, result.correct, result.total)
        }
      }
      // Submit to Supabase leaderboard
      const pctFinal = adaptive.questionsAnswered > 0
        ? Math.round((adaptive.correctAnswers / adaptive.questionsAnswered) * 100) : 0
      submitScore(playerName, topicId, adaptive.correctAnswers, adaptive.questionsAnswered, pctFinal, adaptive.currentDifficulty)
      setFinished(true)
      return
    }
    setCurrentIdx(i => i + 1)
    setSelected(null)
    setShowExplanation(false)
  }

  if (!topic || !currentQuestion) return null

  const questionsAnswered = currentIdx + (selected !== null ? 1 : 0)
  const pct = questionsAnswered > 0
    ? Math.round((adaptive.correctAnswers / questionsAnswered) * 100)
    : 0

  if (finished) {
    return (
      <div className="px-4 pt-8 max-w-lg mx-auto">
        <div className="card text-center">
          <div className="text-5xl mb-4">{pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <div className="text-4xl font-bold mb-2" style={{ color: topic.colour }}>
            {pct}%
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {adaptive.correctAnswers}/{adaptive.questionsAnswered} correct
          </p>
          <p className="text-sm font-medium mb-4">{getScoreMessage(pct)}</p>

          <div className="space-y-2 mb-6">
            {(['easy', 'medium', 'hard'] as const).map(d => {
              const r = difficultyResults[d]
              if (r.total === 0) return null
              return (
                <div key={d} className="flex items-center gap-2 text-sm">
                  <span className="font-bold w-16" style={{ color: getDifficultyColor(d) }}>{getDifficultyLabel(d)}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(r.correct / r.total) * 100}%`, background: getDifficultyColor(d) }} />
                  </div>
                  <span className="text-xs text-gray-500">{r.correct}/{r.total}</span>
                </div>
              )
            })}
          </div>

          <div className="flex gap-2">
            <button className="btn-primary flex-1" onClick={onBack}>Review Topic</button>
            <button className="btn-secondary flex-1" onClick={onHome}>Home</button>
          </div>
        </div>
      </div>
    )
  }

  // Display question number: capped at TOTAL_QUESTIONS
  const displayQNum = Math.min(currentIdx + 1, TOTAL_QUESTIONS)
  const isLastQuestion = currentIdx + 1 >= TOTAL_QUESTIONS

  return (
    <div className="px-4 pt-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">
          ←
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">{topic.emoji} Quiz</h2>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>Q{displayQNum}/{TOTAL_QUESTIONS}</span>
            <span className="badge text-white" style={{ background: getDifficultyColor(currentQuestion.difficulty) }}>
              {getDifficultyLabel(currentQuestion.difficulty)}
            </span>
          </div>
        </div>
        <span className="text-white font-bold">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(currentIdx / TOTAL_QUESTIONS) * 100}%`,
            background: topic.gradient,
          }}
        />
      </div>

      {/* Question card - keyed by the actual question ID for stability */}
      <div className="card mb-4">
        <p className="text-sm font-bold text-gray-800 mb-4">{currentQuestion.question}</p>

        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            let bg = 'bg-gray-50 border-gray-200'
            let textColor = 'text-gray-700'

            if (selected !== null) {
              if (idx === currentQuestion.correctIndex) {
                bg = 'bg-green-100 border-green-400'
                textColor = 'text-green-800'
              } else if (idx === selected && idx !== currentQuestion.correctIndex) {
                bg = 'bg-red-100 border-red-400'
                textColor = 'text-red-800'
              }
            }

            return (
              <button
                key={idx}
                className={`w-full text-left p-3 rounded-xl border-2 ${bg} ${textColor} text-sm font-medium transition-all ${selected === null ? 'active:scale-95' : ''}`}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
                {selected !== null && idx === currentQuestion.correctIndex && ' ✓'}
                {selected !== null && idx === selected && idx !== currentQuestion.correctIndex && ' ✗'}
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-800">
              <span className="font-bold">Explanation: </span>
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {selected !== null && (
        <button className="btn-primary w-full" onClick={nextQuestion}>
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}
