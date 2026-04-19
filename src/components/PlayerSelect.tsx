import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { hasPlayerPin, createPlayerPin, verifyPlayerPin } from '../utils/supabase'

interface Props {
  onSelected: (name: string) => void
}

const players = [
  { name: 'Gisele', emoji: '\uD83D\uDC69\u200D\uD83D\uDD2C', colour: '#ec4899' },
  { name: 'Janco', emoji: '\uD83D\uDC68\u200D\uD83D\uDD2C', colour: '#6366f1' },
]

type Mode = 'select' | 'create-pin' | 'confirm-pin' | 'enter-pin'

export default function PlayerSelect({ onSelected }: Props) {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof players[0] | null>(null)
  const [mode, setMode] = useState<Mode>('select')
  const [pin, setPin] = useState('')
  const [firstPin, setFirstPin] = useState('')  // for confirm step
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)

  // When a player is tapped, check if they have a PIN
  async function handleSelectPlayer(player: typeof players[0]) {
    setSelectedPlayer(player)
    setPin('')
    setFirstPin('')
    setError(null)
    setAttempts(0)
    setLocked(false)
    setLoading(true)

    const exists = await hasPlayerPin(player.name)
    setLoading(false)

    if (exists) {
      setMode('enter-pin')
    } else {
      setMode('create-pin')
    }
  }

  // Handle digit press
  const handleDigit = useCallback((digit: string) => {
    if (locked || loading) return
    setError(null)
    setPin(prev => {
      if (prev.length >= 4) return prev
      return prev + digit
    })
  }, [locked, loading])

  // Handle delete
  const handleDelete = useCallback(() => {
    setPin(prev => prev.slice(0, -1))
    setError(null)
  }, [])

  // Auto-submit when 4 digits entered
  useEffect(() => {
    if (pin.length !== 4 || !selectedPlayer) return

    const timer = setTimeout(async () => {
      if (mode === 'create-pin') {
        // Save first PIN entry, move to confirm
        setFirstPin(pin)
        setPin('')
        setMode('confirm-pin')
      } else if (mode === 'confirm-pin') {
        // Check if confirm matches
        if (pin === firstPin) {
          setLoading(true)
          const ok = await createPlayerPin(selectedPlayer.name, pin)
          setLoading(false)
          if (ok) {
            onSelected(selectedPlayer.name)
          } else {
            setError('Failed to save PIN. Try again.')
            setPin('')
            setMode('create-pin')
          }
        } else {
          triggerShake("PINs don't match. Start again.")
          setPin('')
          setFirstPin('')
          setMode('create-pin')
        }
      } else if (mode === 'enter-pin') {
        setLoading(true)
        const ok = await verifyPlayerPin(selectedPlayer.name, pin)
        setLoading(false)
        if (ok) {
          onSelected(selectedPlayer.name)
        } else {
          const newAttempts = attempts + 1
          setAttempts(newAttempts)
          if (newAttempts >= 3) {
            setLocked(true)
            triggerShake('Too many attempts. Wait 10 seconds.')
            setTimeout(() => {
              setLocked(false)
              setAttempts(0)
              setError(null)
            }, 10000)
          } else {
            triggerShake(`Wrong PIN. ${3 - newAttempts} attempts left.`)
          }
          setPin('')
        }
      }
    }, 200) // small delay so the 4th dot renders before action

    return () => clearTimeout(timer)
  }, [pin, mode, selectedPlayer, firstPin, attempts])

  function triggerShake(msg: string) {
    setError(msg)
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  function handleBack() {
    setMode('select')
    setSelectedPlayer(null)
    setPin('')
    setFirstPin('')
    setError(null)
  }

  // Player select screen
  if (mode === 'select') {
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
                onClick={() => handleSelectPlayer(p)}
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
                <div className="text-2xl text-gray-300">&rarr;</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PIN entry screen
  const player = selectedPlayer!
  const title =
    mode === 'create-pin' ? 'Create your secret PIN' :
    mode === 'confirm-pin' ? 'Confirm your PIN' :
    'Enter your PIN'

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="text-center max-w-xs w-full">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl"
        >
          &larr;
        </button>

        {/* Player avatar */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-3"
          style={{ background: player.colour + '20', border: `3px solid ${player.colour}` }}
        >
          {player.emoji}
        </div>
        <h2 className="text-xl font-bold text-white mb-1">{player.name}</h2>
        <p className="text-white/70 text-sm mb-6">{title}</p>

        {/* PIN dots */}
        <motion.div
          className="flex justify-center gap-4 mb-6"
          animate={shake ? { x: [0, -12, 12, -12, 12, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 transition-all duration-150"
              style={{
                borderColor: error ? '#ef4444' : player.colour,
                background: i < pin.length ? (error ? '#ef4444' : player.colour) : 'transparent',
              }}
            />
          ))}
        </motion.div>

        {/* Error message */}
        {error && (
          <p className="text-red-300 text-xs mb-4 font-medium">{error}</p>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-white/50 text-xs mb-4">Checking...</p>
        )}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
            <button
              key={d}
              className="w-16 h-16 rounded-2xl bg-white/15 text-white text-2xl font-bold active:bg-white/30 transition-colors disabled:opacity-30"
              onClick={() => handleDigit(d)}
              disabled={locked || loading || pin.length >= 4}
            >
              {d}
            </button>
          ))}
          {/* Bottom row: empty, 0, delete */}
          <div /> {/* spacer */}
          <button
            className="w-16 h-16 rounded-2xl bg-white/15 text-white text-2xl font-bold active:bg-white/30 transition-colors disabled:opacity-30"
            onClick={() => handleDigit('0')}
            disabled={locked || loading || pin.length >= 4}
          >
            0
          </button>
          <button
            className="w-16 h-16 rounded-2xl bg-white/10 text-white text-lg active:bg-white/20 transition-colors disabled:opacity-30"
            onClick={handleDelete}
            disabled={locked || loading || pin.length === 0}
          >
            &#9003;
          </button>
        </div>

        {/* Mode hint */}
        <p className="text-white/30 text-[10px] mt-6">
          {mode === 'create-pin' ? 'Choose a 4-digit PIN you\'ll remember' :
           mode === 'confirm-pin' ? 'Enter the same PIN again to confirm' :
           locked ? 'Locked — please wait...' :
           'Enter your 4-digit PIN to continue'}
        </p>
      </div>
    </div>
  )
}
