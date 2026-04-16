import { motion } from 'framer-motion'
import { topics } from './topics'
import { getMastery } from '../utils/storage'

interface Props {
  onSelectTopic: (topicId: string) => void
  onMixedQuiz: () => void
}

export default function HomeScreen({ onSelectTopic, onMixedQuiz }: Props) {
  const overallMastery = topics.reduce((sum, t) => sum + getMastery(t.id), 0) / topics.length

  return (
    <div className="px-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h1
          className="text-3xl font-bold text-white drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          Gisele's Science Quest
        </motion.h1>
        <p className="text-white/80 mt-1 text-sm">Year 11 Science 1.5 - Acids & Bases</p>

        {/* Overall progress */}
        <div className="mt-4 card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Test Readiness</span>
            <span className="text-sm font-bold" style={{ color: overallMastery >= 70 ? '#10b981' : overallMastery >= 40 ? '#f59e0b' : '#ef4444' }}>
              {Math.round(overallMastery)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)' }}
              initial={{ width: 0 }}
              animate={{ width: `${overallMastery}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {overallMastery === 0
              ? 'Start learning to track your progress!'
              : overallMastery >= 80
                ? "You're almost ready for the test!"
                : overallMastery >= 50
                  ? 'Good progress, keep going!'
                  : 'Keep practising, you got this!'}
          </p>
        </div>
      </div>

      {/* Topic cards */}
      <div className="space-y-3">
        {topics.map((topic, i) => {
          const mastery = getMastery(topic.id)
          return (
            <motion.button
              key={topic.id}
              className="w-full card flex items-center gap-4 text-left"
              onClick={() => onSelectTopic(topic.id)}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: topic.gradient }}
              >
                {topic.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm">{topic.title}</h3>
                <p className="text-xs text-gray-500 truncate">{topic.shortDesc}</p>
                <div className="mt-1.5 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${mastery}%`,
                      background: topic.gradient,
                    }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold" style={{ color: topic.colour }}>
                  {mastery}%
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Mixed Quiz button */}
      <motion.button
        className="w-full mt-6 py-4 rounded-2xl font-bold text-white text-lg shadow-lg"
        style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
        onClick={onMixedQuiz}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Mixed Quiz - All Topics
      </motion.button>
    </div>
  )
}
