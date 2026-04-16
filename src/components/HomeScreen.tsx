import { topics } from './topics'
import { getMastery } from '../utils/storage'

interface Props {
  onSelectTopic: (topicId: string) => void
  onMixedQuiz: () => void
  onLeaderboard: () => void
  onSwitchPlayer: () => void
  playerName: string
}

export default function HomeScreen({ onSelectTopic, onMixedQuiz, onLeaderboard, onSwitchPlayer, playerName }: Props) {
  const overallMastery = topics.reduce((sum, t) => sum + getMastery(t.id), 0) / topics.length

  return (
    <div className="px-4 pt-8 max-w-lg mx-auto">
      {/* Player badge + leaderboard */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onSwitchPlayer}
          className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5 text-white text-xs active:scale-95 transition-transform"
        >
          <span>{playerName === 'Gisele' ? '👩‍🔬' : '👨‍🔬'}</span>
          <span className="font-bold">{playerName}</span>
          <span className="text-white/50 text-[10px]">switch</span>
        </button>
        <button
          onClick={onLeaderboard}
          className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5 text-white text-xs active:scale-95 transition-transform"
        >
          <span>🏆</span>
          <span className="font-bold">Scoreboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Science Quest
        </h1>
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
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)',
                width: `${overallMastery}%`,
              }}
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
        {topics.map((topic) => {
          const mastery = getMastery(topic.id)
          return (
            <button
              key={topic.id}
              className="w-full card flex items-center gap-4 text-left active:scale-[0.97] transition-transform"
              onClick={() => onSelectTopic(topic.id)}
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
            </button>
          )
        })}
      </div>

      {/* Mixed Quiz button */}
      <button
        className="w-full mt-6 py-4 rounded-2xl font-bold text-white text-lg shadow-lg active:scale-95 transition-transform"
        style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
        onClick={onMixedQuiz}
      >
        Mixed Quiz - All Topics
      </button>
    </div>
  )
}
