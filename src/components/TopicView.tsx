import { getTopicById } from './topics'
import { getMastery } from '../utils/storage'
import LearnElectrons from '../modules/electron-arrangement/LearnElectrons'
import LearnIons from '../modules/ions-and-formulas/LearnIons'
import LearnBalancing from '../modules/balancing-equations/LearnBalancing'
import LearnAcidsBases from '../modules/acids-and-bases/LearnAcidsBases'
import LearnIndicators from '../modules/indicators/LearnIndicators'
import LearnNeutralisation from '../modules/neutralisation/LearnNeutralisation'

interface Props {
  topicId: string
  onBack: () => void
  onStartQuiz: () => void
}

const learnComponents: Record<string, React.FC> = {
  'electron-arrangement': LearnElectrons,
  'ions-and-formulas': LearnIons,
  'balancing-equations': LearnBalancing,
  'acids-and-bases': LearnAcidsBases,
  'indicators': LearnIndicators,
  'neutralisation': LearnNeutralisation,
}

export default function TopicView({ topicId, onBack, onStartQuiz }: Props) {
  const topic = getTopicById(topicId)
  if (!topic) return null

  const LearnComponent = learnComponents[topicId]
  const mastery = getMastery(topicId)

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
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{topic.emoji} {topic.title}</h2>
          <p className="text-white/70 text-xs">Mastery: {mastery}%</p>
        </div>
      </div>

      {/* Learn content */}
      <div className="card mb-4 overflow-hidden">
        {LearnComponent && <LearnComponent />}
      </div>

      {/* Quiz button */}
      <button
        className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-lg mb-4"
        style={{ background: topic.gradient }}
        onClick={onStartQuiz}
      >
        Take the Quiz
      </button>
    </div>
  )
}
