import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { neutralisationReactions, saltNamingRules } from '../../data/compounds'

type Tab = 'learn' | 'mixer'

export default function LearnNeutralisation() {
  const [tab, setTab] = useState<Tab>('learn')
  const [mixerIdx, setMixerIdx] = useState(0)
  const [showMixerAnswer, setShowMixerAnswer] = useState(false)
  const [userSalt, setUserSalt] = useState('')
  const [mixerResult, setMixerResult] = useState<string | null>(null)

  const reaction = neutralisationReactions[mixerIdx % neutralisationReactions.length]

  function checkSalt() {
    const clean = (s: string) => s.toLowerCase().trim()
    if (clean(userSalt) === clean(reaction.salt)) {
      setMixerResult('Correct!')
    } else {
      setMixerResult(`The salt is: ${reaction.salt}`)
    }
  }

  function nextReaction() {
    setMixerIdx(i => i + 1)
    setUserSalt('')
    setMixerResult(null)
    setShowMixerAnswer(false)
  }

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {[
          { key: 'learn' as const, label: 'Learn' },
          { key: 'mixer' as const, label: 'Reaction Mixer' },
        ].map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-pink-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Core concept */}
            <div className="bg-pink-50 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-pink-800 text-sm mb-2">What is Neutralisation?</h3>
              <p className="text-xs text-pink-700 mb-2">
                When an acid and a base react, the H⁺ and OH⁻ ions combine to make <strong>water</strong>.
                This cancels out the acidity/basicity.
              </p>
              <div className="bg-white rounded-xl p-3 text-center">
                <p className="text-sm font-mono font-bold text-pink-700">H⁺ + OH⁻ → H₂O</p>
              </div>
            </div>

            {/* General equation */}
            <div className="bg-purple-50 rounded-xl p-4 mb-3">
              <h4 className="font-bold text-purple-700 text-xs mb-2">The General Equation</h4>
              <div className="bg-white rounded-xl p-3 text-center space-y-2">
                <p className="font-bold text-sm">ACID + BASE → SALT + WATER</p>
                <p className="text-xs text-gray-500">The salt name comes from the metal in the base + the acid type</p>
              </div>
            </div>

            {/* Salt naming */}
            <div className="bg-amber-50 rounded-xl p-4 mb-3">
              <h4 className="font-bold text-amber-700 text-xs mb-2">How to Name the Salt</h4>
              <div className="space-y-1 text-xs">
                {Object.entries(saltNamingRules.acids).map(([acid, ending]) => (
                  <div key={acid} className="flex justify-between bg-white rounded-lg p-2">
                    <span>{acid}</span>
                    <span className="font-bold text-amber-700">→ {ending}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Example: sodium hydroxide + hydrochloric acid → <strong>sodium chloride</strong> + water
              </p>
            </div>

            {/* Carbonate reactions */}
            <div className="bg-green-50 rounded-xl p-4 mb-3">
              <h4 className="font-bold text-green-700 text-xs mb-2">With Carbonates (extra product!)</h4>
              <div className="bg-white rounded-xl p-3 text-center space-y-2">
                <p className="font-bold text-sm">ACID + CARBONATE → SALT + WATER + CO₂</p>
                <p className="text-xs text-gray-500">These reactions also produce carbon dioxide gas (bubbles!)</p>
              </div>
            </div>

            {/* Real-world examples */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-bold text-blue-700 text-xs mb-2">Real-World Examples</h4>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex gap-2 items-start">
                  <span className="text-lg">🐝</span>
                  <p>Bee stings are <strong>acidic</strong> - neutralise with baking soda (a base)</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-lg">💊</span>
                  <p>Indigestion = too much stomach acid - antacids (bases like Mg(OH)₂) neutralise it</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-lg">🌱</span>
                  <p>Acidic soil - farmers add lime (CaCO₃) to neutralise it for better plant growth</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'mixer' && (
          <motion.div key="mixer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Reasoning reminder */}
            <div className="bg-pink-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-pink-700">
                <strong>How to name the salt:</strong> Take the <strong>metal name from the base</strong> +
                the <strong>ending from the acid</strong> (HCl → chloride, H₂SO₄ → sulfate, HNO₃ → nitrate).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-500 mb-2">What salt is formed when you mix:</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-red-100 rounded-xl px-3 py-2">
                  <p className="text-xs text-red-600 font-bold">{reaction.acid}</p>
                </div>
                <span className="text-xl font-bold text-gray-400">+</span>
                <div className="bg-blue-100 rounded-xl px-3 py-2">
                  <p className="text-xs text-blue-600 font-bold">{reaction.base}</p>
                </div>
              </div>

              {/* Reasoning hints */}
              <div className="bg-white rounded-lg p-2 mt-2 inline-block text-xs text-gray-500">
                <p>Metal from base: <strong className="text-blue-600">{reaction.base.replace(/ hydroxide| oxide| carbonate| hydrogen carbonate/gi, '').trim()}</strong></p>
                <p>Acid type: <strong className="text-red-600">{
                  reaction.acid.includes('hydrochloric') ? 'hydrochloric → chloride' :
                  reaction.acid.includes('sulfuric') ? 'sulfuric → sulfate' :
                  reaction.acid.includes('nitric') ? 'nitric → nitrate' : reaction.acid
                }</strong></p>
              </div>

              <div className="mt-2">
                <span className={`badge ${reaction.difficulty === 'easy' ? 'bg-green-100 text-green-700' : reaction.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {reaction.difficulty}
                </span>
              </div>
            </div>

            <input
              type="text"
              value={userSalt}
              onChange={e => { setUserSalt(e.target.value); setMixerResult(null) }}
              placeholder="Name the salt produced..."
              className="w-full p-3 rounded-xl border-2 border-gray-200 text-center mb-3 focus:outline-none focus:border-pink-400"
            />

            {mixerResult && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-center p-3 rounded-xl mb-3 font-bold ${mixerResult === 'Correct!' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
              >
                {mixerResult}
              </motion.div>
            )}

            <div className="flex gap-2 mb-3">
              <button className="btn-primary flex-1" onClick={checkSalt}>Check</button>
              <button className="btn-secondary flex-1" onClick={nextReaction}>Next</button>
            </div>

            <button
              className="w-full text-xs text-gray-500 underline"
              onClick={() => setShowMixerAnswer(!showMixerAnswer)}
            >
              {showMixerAnswer ? 'Hide full equation' : 'Show full equation'}
            </button>
            {showMixerAnswer && (
              <div className="mt-2 bg-gray-50 rounded-xl p-3 text-center space-y-1">
                <p className="text-xs text-gray-500">Word equation:</p>
                <p className="text-xs font-bold">{reaction.wordEquation}</p>
                <p className="text-xs text-gray-500 mt-2">Symbol equation:</p>
                <p className="text-xs font-mono font-bold">{reaction.symbolEquation}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
