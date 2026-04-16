import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { acids, bases } from '../../data/compounds'

type Tab = 'learn' | 'classify'

const classifyItems = [
  { name: 'Hydrochloric acid', answer: 'acid' },
  { name: 'Sodium hydroxide', answer: 'base' },
  { name: 'Pure water', answer: 'neutral' },
  { name: 'Sulfuric acid', answer: 'acid' },
  { name: 'Ammonia solution', answer: 'base' },
  { name: 'Vinegar', answer: 'acid' },
  { name: 'Calcium hydroxide', answer: 'base' },
  { name: 'Lemon juice', answer: 'acid' },
  { name: 'Baking soda', answer: 'base' },
  { name: 'Nitric acid', answer: 'acid' },
  { name: 'Milk of magnesia', answer: 'base' },
  { name: 'Citric acid', answer: 'acid' },
  { name: 'Potassium hydroxide', answer: 'base' },
  { name: 'Battery acid', answer: 'acid' },
  { name: 'Bleach', answer: 'base' },
]

export default function LearnAcidsBases() {
  const [tab, setTab] = useState<Tab>('learn')
  const [classifyIdx, setClassifyIdx] = useState(0)
  const [classifyScore, setClassifyScore] = useState(0)
  const [classifyTotal, setClassifyTotal] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const current = classifyItems[classifyIdx % classifyItems.length]

  function handleClassify(answer: string) {
    setClassifyTotal(t => t + 1)
    if (answer === current.answer) {
      setClassifyScore(s => s + 1)
      setFeedback('Correct!')
    } else {
      setFeedback(`Nope! ${current.name} is ${current.answer === 'neutral' ? 'neutral' : `a ${current.answer}`}`)
    }
    setTimeout(() => {
      setClassifyIdx(i => i + 1)
      setFeedback(null)
    }, 1200)
  }

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {[
          { key: 'learn' as const, label: 'Learn' },
          { key: 'classify' as const, label: 'Classify Game' },
        ].map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-red-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Acid definition */}
            <div className="bg-red-50 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-red-800 text-sm mb-2">What is an Acid?</h3>
              <p className="text-xs text-red-700 mb-2">
                An acid is a substance that <strong>ionises</strong> (splits apart) in water to produce{' '}
                <strong>hydrogen ions (H⁺)</strong>.
              </p>
              <p className="text-xs text-red-600 font-mono text-center mb-2">acid → H⁺ + negative ion</p>
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-800">Strong acids (100% ionise):</p>
                {acids.filter(a => a.strength === 'strong').map(a => (
                  <div key={a.formula} className="bg-white rounded-lg p-2 flex justify-between items-center">
                    <span className="text-xs">{a.commonName}</span>
                    <span className="text-xs font-mono font-bold text-red-700">{a.formula}</span>
                  </div>
                ))}
                <p className="text-xs font-bold text-red-800 mt-2">Weak acids (partial ionisation):</p>
                {acids.filter(a => a.strength === 'weak').slice(0, 3).map(a => (
                  <div key={a.formula} className="bg-white rounded-lg p-2 flex justify-between items-center">
                    <span className="text-xs">{a.commonName}</span>
                    <span className="text-xs font-mono font-bold text-red-700">{a.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Base definition */}
            <div className="bg-blue-50 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-blue-800 text-sm mb-2">What is a Base?</h3>
              <p className="text-xs text-blue-700 mb-2">
                A base is a substance that produces <strong>hydroxide ions (OH⁻)</strong> in water.
                A base that <strong>dissolves</strong> in water is called an <strong>alkali</strong>.
              </p>
              <p className="text-xs text-blue-600 font-mono text-center mb-2">base → metal ion + OH⁻</p>
              <div className="space-y-1">
                {bases.slice(0, 5).map(b => (
                  <div key={b.formula} className="bg-white rounded-lg p-2 flex justify-between items-center">
                    <span className="text-xs">{b.commonName}</span>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-blue-700">{b.formula}</span>
                      {b.isAlkali && <span className="text-[10px] text-blue-500 ml-1">(alkali)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick comparison */}
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-bold text-purple-700 text-xs mb-2 text-center">Quick Comparison</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center">
                  <div className="text-2xl mb-1">🔴</div>
                  <p className="font-bold text-red-700">Acids</p>
                  <p className="text-gray-600">Produce H⁺</p>
                  <p className="text-gray-600">pH below 7</p>
                  <p className="text-gray-600">Taste sour</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🔵</div>
                  <p className="font-bold text-blue-700">Bases</p>
                  <p className="text-gray-600">Produce OH⁻</p>
                  <p className="text-gray-600">pH above 7</p>
                  <p className="text-gray-600">Feel slippery</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'classify' && (
          <motion.div key="classify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Reasoning reminder */}
            <div className="bg-red-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-red-700">
                <strong>How to tell:</strong> Acids have "acid" in the name or produce H⁺ (e.g. HCl, vinegar, citric acid).
                Bases contain OH or are metal oxides/carbonates (e.g. NaOH, baking soda). pH 7 = neutral.
              </p>
            </div>

            <div className="text-center mb-4">
              <p className="text-xs text-gray-500 mb-1">Score: {classifyScore}/{classifyTotal}</p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-xs text-gray-500 mb-2">Is this an acid, base, or neutral?</p>
                <h3 className="text-xl font-bold text-gray-800">{current.name}</h3>
              </div>
            </div>

            {feedback ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-center p-4 rounded-xl font-bold ${feedback === 'Correct!' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {feedback}
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <button className="py-4 rounded-xl font-bold text-white bg-red-500 active:scale-95 transition-transform" onClick={() => handleClassify('acid')}>
                  Acid
                  <span className="block text-[10px] font-normal opacity-80">produces H⁺</span>
                </button>
                <button className="py-4 rounded-xl font-bold text-white bg-green-500 active:scale-95 transition-transform" onClick={() => handleClassify('neutral')}>
                  Neutral
                  <span className="block text-[10px] font-normal opacity-80">pH = 7</span>
                </button>
                <button className="py-4 rounded-xl font-bold text-white bg-blue-500 active:scale-95 transition-transform" onClick={() => handleClassify('base')}>
                  Base
                  <span className="block text-[10px] font-normal opacity-80">produces OH⁻</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
