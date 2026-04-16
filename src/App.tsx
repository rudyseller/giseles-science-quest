import { useState, useCallback } from 'react'
import HomeScreen from './components/HomeScreen'
import TopicView from './components/TopicView'
import QuizView from './components/QuizView'
import MixedQuizView from './components/MixedQuizView'

export type Screen =
  | { type: 'home' }
  | { type: 'topic'; topicId: string }
  | { type: 'quiz'; topicId: string }
  | { type: 'mixed-quiz' }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' })

  const goHome = useCallback(() => setScreen({ type: 'home' }), [])
  const goTopic = useCallback((topicId: string) => setScreen({ type: 'topic', topicId }), [])
  const goQuiz = useCallback((topicId: string) => setScreen({ type: 'quiz', topicId }), [])
  const goMixedQuiz = useCallback(() => setScreen({ type: 'mixed-quiz' }), [])

  return (
    <div className="min-h-[100dvh] pb-6">
      {screen.type === 'home' && (
        <HomeScreen onSelectTopic={goTopic} onMixedQuiz={goMixedQuiz} />
      )}
      {screen.type === 'topic' && (
        <TopicView
          topicId={screen.topicId}
          onBack={goHome}
          onStartQuiz={() => goQuiz(screen.topicId)}
        />
      )}
      {screen.type === 'quiz' && (
        <QuizView
          topicId={screen.topicId}
          onBack={() => goTopic(screen.topicId)}
          onHome={goHome}
        />
      )}
      {screen.type === 'mixed-quiz' && (
        <MixedQuizView onBack={goHome} />
      )}
    </div>
  )
}
