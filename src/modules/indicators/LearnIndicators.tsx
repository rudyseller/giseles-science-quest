import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { indicators, pHColours, commonSubstances, getPHColour, classifyPH } from '../../data/indicators'

type Tab = 'learn' | 'lab'

export default function LearnIndicators() {
  const [tab, setTab] = useState<Tab>('learn')
  const [selectedPH, setSelectedPH] = useState(7)
  const [labIdx, setLabIdx] = useState(0)
  const [labIndicator, setLabIndicator] = useState(0)
  const [labGuess, setLabGuess] = useState<string | null>(null)
  const [labScore, setLabScore] = useState(0)
  const [labTotal, setLabTotal] = useState(0)

  const substance = commonSubstances[labIdx % commonSubstances.length]
  const indicator = indicators[labIndicator % indicators.length]

  function getIndicatorColour(ind: typeof indicators[0], pH: number): { colour: string; name: string } {
    if (pH < 7) return { colour: ind.acidColour, name: ind.acidColourName }
    if (pH === 7) return { colour: ind.neutralColour, name: ind.neutralColourName }
    return { colour: ind.baseColour, name: ind.baseColourName }
  }

  function handleLabGuess(guess: string) {
    const result = getIndicatorColour(indicator, substance.pH)
    setLabTotal(t => t + 1)
    if (guess.toLowerCase() === result.name.toLowerCase().split('/')[0]) {
      setLabGuess('Correct!')
      setLabScore(s => s + 1)
    } else {
      setLabGuess(`It would be ${result.name}! (pH ${substance.pH} is ${classifyPH(substance.pH)})`)
    }
    setTimeout(() => {
      setLabIdx(i => i + 1)
      setLabIndicator(Math.floor(Math.random() * 3))
      setLabGuess(null)
    }, 2000)
  }

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {[
          { key: 'learn' as const, label: 'Learn' },
          { key: 'lab' as const, label: 'Virtual Lab' },
        ].map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* pH scale */}
            <div className="bg-purple-50 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-purple-800 text-sm mb-2">The pH Scale</h3>
              <p className="text-xs text-purple-700 mb-3">
                pH measures how acidic or basic a solution is, from <strong>0 (very acidic)</strong> to <strong>14 (very basic)</strong>.
                <strong> pH 7 = neutral</strong> (like pure water).
              </p>

              {/* Interactive pH bar */}
              <div className="relative mb-2">
                <div className="flex rounded-full overflow-hidden h-8">
                  {pHColours.map(p => (
                    <button
                      key={p.pH}
                      className={`flex-1 flex items-center justify-center text-[10px] font-bold text-white transition-all ${selectedPH === p.pH ? 'ring-2 ring-white scale-110 z-10' : ''}`}
                      style={{ background: p.colour }}
                      onClick={() => setSelectedPH(p.pH)}
                    >
                      {p.pH}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] mt-1 px-1">
                  <span className="text-red-600 font-bold">← ACID</span>
                  <span className="text-green-600 font-bold">NEUTRAL</span>
                  <span className="text-purple-600 font-bold">BASE →</span>
                </div>
              </div>

              {/* Selected pH info */}
              <motion.div
                key={selectedPH}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-3 text-center"
              >
                <div className="text-3xl font-bold" style={{ color: getPHColour(selectedPH) }}>
                  pH {selectedPH}
                </div>
                <p className="text-sm font-bold text-gray-700">{pHColours[selectedPH].label}</p>
                <p className="text-xs text-gray-500">
                  {commonSubstances.find(s => s.pH === selectedPH)?.name || ''}
                </p>
              </motion.div>
            </div>

            {/* Indicator cards */}
            <h4 className="font-bold text-sm mb-2">Three Indicators to Know:</h4>
            <div className="space-y-2 mb-4">
              {indicators.map(ind => (
                <div key={ind.name} className="bg-white rounded-xl p-3 border border-gray-200">
                  <h5 className="font-bold text-sm text-gray-800 mb-2">{ind.name}</h5>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-1 border border-gray-300"
                        style={{ background: ind.acidColour }}
                      />
                      <p className="font-bold text-red-600">Acid</p>
                      <p className="text-gray-500">{ind.acidColourName}</p>
                    </div>
                    <div>
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-1 border border-gray-300"
                        style={{ background: ind.neutralColour }}
                      />
                      <p className="font-bold text-green-600">Neutral</p>
                      <p className="text-gray-500">{ind.neutralColourName}</p>
                    </div>
                    <div>
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-1 border border-gray-300"
                        style={{ background: ind.baseColour }}
                      />
                      <p className="font-bold text-blue-600">Base</p>
                      <p className="text-gray-500">{ind.baseColourName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'lab' && (
          <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-4">
              <p className="text-xs text-gray-500 mb-1">Score: {labScore}/{labTotal}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-500 mb-1">You test:</p>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{substance.name}</h3>
              <p className="text-xs text-gray-500 mb-1">Using:</p>
              <h4 className="text-sm font-bold text-purple-700">{indicator.name}</h4>
              <p className="text-xs text-gray-400 mt-1">What colour would you see?</p>
            </div>

            {labGuess ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-center p-4 rounded-xl font-bold ${labGuess === 'Correct!' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
              >
                {labGuess}
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {(() => {
                  const options = new Set<string>()
                  options.add(indicator.acidColourName.split('/')[0])
                  options.add(indicator.baseColourName.split('/')[0])
                  if (indicator.neutralColourName !== indicator.acidColourName) {
                    options.add(indicator.neutralColourName.split('/')[0])
                  }
                  // Add a distractor
                  options.add('Yellow')
                  const opts = Array.from(options).slice(0, 4)
                  return opts.map(opt => (
                    <button
                      key={opt}
                      className="py-3 rounded-xl font-bold text-sm text-white active:scale-95 transition-transform"
                      style={{ background: opt === 'Red' ? '#ef4444' : opt === 'Blue' ? '#3b82f6' : opt === 'Pink' ? '#ec4899' : opt === 'Colourless' ? '#94a3b8' : opt === 'Green' ? '#22c55e' : opt === 'Purple' ? '#8b5cf6' : '#eab308' }}
                      onClick={() => handleLabGuess(opt)}
                    >
                      {opt}
                    </button>
                  ))
                })()}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
