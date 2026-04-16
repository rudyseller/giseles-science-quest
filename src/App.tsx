import { useState, useCallback } from 'react'
import { getPlayerName } from './utils/supabase'
import PlayerSelect from './components/PlayerSelect'
import HomeScreen from './components/HomeScreen'
import TopicView from './components/TopicView'
import QuizView from './components/QuizView'
import MixedQuizView from './components/MixedQuizView'
import Leaderboard from './components/Leaderboard'

export type Screen =
  | { type: 'player-select' }
  | { type: 'home' }
  | { type: 'topic'; topicId: string }
  | { type: 'quiz'; topicId: string }
  | { type: 'mixed-quiz' }
  | { type: 'leaderboard' }

export default function App() {
  const [player, setPlayer] = useState<string | null>(getPlayerName())
  const [screen, setScreen] = useState<Screen>(player ? { type: 'home' } : { type: 'player-select' })

  const goHome = useCallback(() => setScreen({ type: 'home' }), [])
  const goTopic = useCallback((topicId: string) => setScreen({ type: 'topic', topicId }), [])
  const goQuiz = useCallback((topicId: string) => setScreen({ type: 'quiz', topicId }), [])
  const goMixedQuiz = useCallback(() => setScreen({ type: 'mixed-quiz' }), [])
  const goLeaderboard = useCallback(() => setScreen({ type: 'leaderboard' }), [])

  function handlePlayerSelected(name: string) {
    setPlayer(name)
    setScreen({ type: 'home' })
  }

  function handleSwitchPlayer() {
    setPlayer(null)
    setScreen({ type: 'player-select' })
  }

  return (
    <div className="min-h-[100dvh] pb-6">
      {screen.type === 'player-select' && (
        <PlayerSelect onSelected={handlePlayerSelected} />
      )}
      {screen.type === 'home' && player && (
        <HomeScreen
          onSelectTopic={goTopic}
          onMixedQuiz={goMixedQuiz}
          onLeaderboard={goLeaderboard}
          onSwitchPlayer={handleSwitchPlayer}
          playerName={player}
        />
      )}
      {screen.type === 'topic' && (
        <TopicView
          topicId={screen.topicId}
          onBack={goHome}
          onStartQuiz={() => goQuiz(screen.topicId)}
        />
      )}
      {screen.type === 'quiz' && player && (
        <QuizView
          topicId={screen.topicId}
          playerName={player}
          onBack={() => goTopic(screen.topicId)}
          onHome={goHome}
        />
      )}
      {screen.type === 'mixed-quiz' && player && (
        <MixedQuizView onBack={goHome} playerName={player} />
      )}
      {screen.type === 'leaderboard' && player && (
        <Leaderboard onBack={goHome} currentPlayer={player} />
      )}
    </div>
  )
}
