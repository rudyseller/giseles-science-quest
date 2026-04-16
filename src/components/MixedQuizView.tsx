import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMixedQuestions, type Question } from '../data/questions'
import { topics } from './topics'
import { createAdaptiveState, updateAdaptive, getScoreMessage, getDifficultyColor, getDifficultyLabel, type AdaptiveState } from '../utils/adaptive'
import { recordQuizResult, getMastery } from '../utils/storage'

interface Props {
  onBack: () => void
}

export default function MixedQuizView({ onBack }: Props) {
  // Find weak topics (mastery < 50%)
  const weakTopics = topics.filter(t => getMastery(t.id) < 50).map(t => t.id)

  const questions = useMemo(() => getMixedQuestions(15, weakTopics), [])
  const [adaptive, setAdaptive] = useState<AdaptiveState>(createAdaptiveState)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)
  const [topicResults, setTopicResults] = useState<Record<string, { correct: number; total: number }>>({})

  const currentQuestion: Question | undefined = questions[currentIdx]
  const totalQuestions = questions.length

  function handleAnswer(optionIdx: number) {
    if (selected !== null || !currentQuestion) return
    setSelected(optionIdx)
    setShowExplanation(true)

    const correct = optionIdx === currentQuestion.correctIndex
    setAdaptive(updateAdaptive(adaptive, correct))

    const tr = { ...topicResults }
    const t = currentQuestion.topic
    if (!tr[t]) tr[t] = { correct: 0, total: 0 }
    tr[t] = { correct: tr[t].correct + (correct ? 1 : 0), total: tr[t].total + 1 }
    setTopicResults(tr)
  }

  function nextQuestion() {
    if (currentIdx + 1 >= totalQuestions) {
      // Save per-topic results
      for (const [topicId, result] of Object.entries(topicResults)) {
        if (result.total > 0) {
          recordQuizResult(topicId, 'medium', result.correct, result.total)
        }
      }
      setFinished(true)
      return
    }
    setCurrentIdx(i => i + 1)
    setSelected(null)
    setShowExplanation(false)
  }

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Mixed Quiz Complete!</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{pct}%</div>
          <p className="text-sm text-gray-600 mb-4">
            {adaptive.correctAnswers}/{adaptive.questionsAnswered} correct
          </p>
          <p className="text-sm font-medium mb-6">{getScoreMessage(pct)}</p>

          {/* Per-topic breakdown */}
          <h4 className="text-sm font-bold text-gray-700 mb-3">Topic Breakdown:</h4>
          <div className="space-y-2 mb-6">
            {topics.map(t => {
              const r = topicResults[t.id]
              if (!r) return null
              const topicPct = Math.round((r.correct / r.total) * 100)
              return (
                <div key={t.id} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{t.emoji}</span>
                  <span className="flex-1 text-left text-xs font-medium truncate">{t.title}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${topicPct}%`, background: t.colour }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{r.correct}/{r.total}</span>
                </div>
              )
            })}
          </div>

          <button className="btn-primary w-full" onClick={onBack}>Back to Home</button>
        </motion.div>
      </div>
    )
  }

  if (!currentQuestion) return null

  const questionTopic = topics.find(t => t.id === currentQuestion.topic)

  return (
    <div className="px-4 pt-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">
          ←
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">Mixed Quiz</h2>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>Q{currentIdx + 1}/{totalQuestions}</span>
            {questionTopic && (
              <span className="badge bg-white/20 text-white">{questionTopic.emoji} {questionTopic.title}</span>
            )}
          </div>
        </div>
        <span className="text-white font-bold">{pct}%</span>
      </div>

      <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((currentIdx) / totalQuestions) * 100}%`,
            background: 'linear-gradient(90deg, #6366f1, #ec4899)',
          }}
        />
      </div>

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
                  className={`w-full text-left p-3 rounded-xl border-2 ${bg} ${textColor} text-sm font-medium transition-all`}
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
          {currentIdx + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
        </motion.button>
      )}
    </div>
  )
}
