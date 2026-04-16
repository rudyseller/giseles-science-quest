import { setPlayerName } from '../utils/supabase'

interface Props {
  onSelected: (name: string) => void
}

const players = [
  { name: 'Gisele', emoji: '👩‍🔬', colour: '#ec4899' },
  { name: 'Janco', emoji: '👨‍🔬', colour: '#6366f1' },
]

export default function PlayerSelect({ onSelected }: Props) {
  function handleSelect(name: string) {
    setPlayerName(name)
    onSelected(name)
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
          Science Quest
        </h1>
        <p className="text-white/70 text-sm mb-8">Who's studying today?</p>

        <div className="space-y-4">
          {players.map(p => (
            <button
              key={p.name}
              className="w-full card flex items-center gap-4 active:scale-95 transition-transform"
              onClick={() => handleSelect(p.name)}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: p.colour + '20', border: `3px solid ${p.colour}` }}
              >
                {p.emoji}
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold text-gray-800">{p.name}</h2>
                <p className="text-xs text-gray-500">Tap to start</p>
              </div>
              <div className="text-2xl text-gray-300">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
