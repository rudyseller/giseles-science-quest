import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTopicById } from './topics'
import { getQuestionsByTopic, type Question } from '../data/questions'
import { createAdaptiveState, updateAdaptive, getScoreMessage, getDifficultyColor, getDifficultyLabel, type AdaptiveState } from '../utils/adaptive'
import { recordQuizResult } from '../utils/storage'

interface Props {
  topicId: string
  onBack: () => void
  onHome: () => void
}

export default function QuizView({ topicId, onBack, onHome }: Props) {
  const topic = getTopicById(topicId)
  const questions = useMemo(() => {
    const all = getQuestionsByTopic(topicId)
    return [...all].sort(() => Math.random() - 0.5)
  }, [topicId])

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

  // Filter questions by current difficulty, cycling through available ones
  const availableQuestions = useMemo(() => {
    const byDiff = questions.filter(q => q.difficulty === adaptive.currentDifficulty)
    if (byDiff.length > 0) return byDiff
    return questions // fallback to all if none at current difficulty
  }, [questions, adaptive.currentDifficulty])

  const currentQuestion: Question | undefined = availableQuestions[currentIdx % availableQuestions.length]
  const totalQuestions = Math.min(10, questions.length)

  function handleAnswer(optionIdx: number) {
    if (selected !== null || !currentQuestion) return
    setSelected(optionIdx)
    setShowExplanation(true)

    const correct = optionIdx === currentQuestion.correctIndex
    const newAdaptive = updateAdaptive(adaptive, correct)
    setAdaptive(newAdaptive)

    const dr = { ...difficultyResults }
    const d = currentQuestion.difficulty
    dr[d] = { correct: dr[d].correct + (correct ? 1 : 0), total: dr[d].total + 1 }
    setDifficultyResults(dr)
  }

  function nextQuestion() {
    if (adaptive.questionsAnswered >= totalQuestions) {
      // Save results
      for (const [diff, result] of Object.entries(difficultyResults)) {
        if (result.total > 0) {
          recordQuizResult(topicId, diff as any, result.correct, result.total)
        }
      }
      setFinished(true)
      return
    }
    setCurrentIdx(i => i + 1)
    setSelected(null)
    setShowExplanation(false)
  }

  if (!topic || !currentQuestion) return null

  const pct = adaptive.questionsAnswered > 0
    ? Math.round((adaptive.correctAnswers / adaptive.questionsAnswered) * 100)
    : 0

  if (finished) {
    return (
      <div className="px-4 pt-8 max-w-lg mx-auto">
        <motion.div
          className="card text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-5xl mb-4">{pct >= 70 ? '🌟' : pct >= 40 ? '💪' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <div className="text-4xl font-bold mb-2" style={{ color: topic.colour }}>
            {pct}%
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {adaptive.correctAnswers}/{adaptive.questionsAnswered} correct
          </p>
          <p className="text-sm font-medium mb-4">{getScoreMessage(pct)}</p>

          {/* Per-difficulty breakdown */}
          <div className="space-y-2 mb-6">
            {(['easy', 'medium', 'hard'] as const).map(d => {
              const r = difficultyResults[d]
              if (r.total === 0) return null
              return (
                <div key={d} className="flex items-center gap-2 text-sm">
                  <span className="font-bold w-16" style={{ color: getDifficultyColor(d) }}>{getDifficultyLabel(d)}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.total > 0 ? (r.correct / r.total) * 100 : 0}%`, background: getDifficultyColor(d) }} />
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
        </motion.div>
      </div>
    )
  }

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
            <span>Q{adaptive.questionsAnswered + 1}/{totalQuestions}</span>
            <span className="badge text-white" style={{ background: getDifficultyColor(adaptive.currentDifficulty) }}>
              {getDifficultyLabel(adaptive.currentDifficulty)}
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
            width: `${(adaptive.questionsAnswered / totalQuestions) * 100}%`,
            background: topic.gradient,
          }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="card mb-4"
        >
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
                  className={`w-full text-left p-3 rounded-xl border-2 ${bg} ${textColor} text-sm font-medium transition-all ${selected === null ? 'active:scale-98' : ''}`}
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
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-blue-50 rounded-xl"
            >
              <p className="text-xs text-blue-800">
                <span className="font-bold">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {selected !== null && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="btn-primary w-full"
          onClick={nextQuestion}
        >
          {adaptive.questionsAnswered >= totalQuestions ? 'See Results' : 'Next Question'}
        </motion.button>
      )}
    </div>
  )
}
