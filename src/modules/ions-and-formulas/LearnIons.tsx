import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { positiveIons, negativeIons, compoundPractice } from '../../data/ions'

type Tab = 'learn' | 'ions' | 'formula'

export default function LearnIons() {
  const [tab, setTab] = useState<Tab>('learn')
  const [formulaIdx, setFormulaIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [formulaResult, setFormulaResult] = useState<'correct' | 'wrong' | null>(null)
  const [flippedIons, setFlippedIons] = useState<Set<string>>(new Set())

  const tabs: { key: Tab; label: string }[] = [
    { key: 'learn', label: 'Learn' },
    { key: 'ions', label: 'Ion Table' },
    { key: 'formula', label: 'Formula Builder' },
  ]

  const currentCompound = compoundPractice[formulaIdx % compoundPractice.length]

  function checkFormula() {
    const clean = (s: string) => s.replace(/\s/g, '').replace(/[₂₃₄₅₆₇₈₉]/g, m => {
      const sub = '₀₁₂₃₄₅₆₇₈₉'.indexOf(m).toString()
      return sub
    }).toLowerCase()

    const answer = clean(currentCompound.formula)
    const attempt = clean(userAnswer)

    // also accept plain ascii versions
    const answerAscii = currentCompound.formula
      .replace(/₂/g, '2').replace(/₃/g, '3').replace(/₄/g, '4')
      .replace(/\s/g, '').toLowerCase()
    const attemptLower = userAnswer.replace(/\s/g, '').toLowerCase()

    if (attempt === answer || attemptLower === answerAscii) {
      setFormulaResult('correct')
    } else {
      setFormulaResult('wrong')
    }
  }

  function nextFormula() {
    setFormulaIdx(i => i + 1)
    setUserAnswer('')
    setFormulaResult(null)
    setShowAnswer(false)
  }

  function toggleIon(name: string) {
    const next = new Set(flippedIons)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setFlippedIons(next)
  }

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-amber-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-amber-800 text-sm mb-2">How Ions Form</h3>
              <p className="text-xs text-amber-700 mb-3">
                When atoms react, they want a <strong>full outer shell</strong>. They do this by losing or gaining electrons.
              </p>
            </div>

            {/* Positive ions */}
            <div className="bg-blue-50 rounded-xl p-3 mb-3">
              <h4 className="font-bold text-blue-700 text-xs mb-1">Positive Ions (Metals lose electrons)</h4>
              <p className="text-xs text-blue-600 mb-2">
                If an atom has <strong>1, 2, or 3 outer electrons</strong>, it's easier to <strong>lose</strong> them.
                Fewer electrons than protons = <strong>positive charge</strong>.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="text-2xl">Na</div>
                  <div className="text-[10px] text-gray-500">2,8,1</div>
                </div>
                <motion.div animate={{ x: [0, 20, 20] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <span className="text-xs">→ loses 1e⁻ →</span>
                </motion.div>
                <div className="text-center">
                  <div className="text-2xl text-blue-600 font-bold">Na⁺</div>
                  <div className="text-[10px] text-gray-500">2,8</div>
                </div>
              </div>
            </div>

            {/* Negative ions */}
            <div className="bg-red-50 rounded-xl p-3 mb-3">
              <h4 className="font-bold text-red-700 text-xs mb-1">Negative Ions (Non-metals gain electrons)</h4>
              <p className="text-xs text-red-600 mb-2">
                If an atom has <strong>5, 6, or 7 outer electrons</strong>, it's easier to <strong>gain</strong> electrons to fill the shell.
                More electrons than protons = <strong>negative charge</strong>.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <div className="text-2xl">Cl</div>
                  <div className="text-[10px] text-gray-500">2,8,7</div>
                </div>
                <motion.div animate={{ x: [0, -20, -20] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <span className="text-xs">← gains 1e⁻ ←</span>
                </motion.div>
                <div className="text-center">
                  <div className="text-2xl text-red-600 font-bold">Cl⁻</div>
                  <div className="text-[10px] text-gray-500">2,8,8</div>
                </div>
              </div>
            </div>

            {/* Polyatomic ions */}
            <div className="bg-purple-50 rounded-xl p-3 mb-3">
              <h4 className="font-bold text-purple-700 text-xs mb-1">Polyatomic Ions (multiple atoms)</h4>
              <p className="text-xs text-purple-600 mb-2">Some ions are made of more than one atom bonded together. Learn these names!</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {[
                  { name: 'Hydroxide', sym: 'OH⁻', charge: '-1' },
                  { name: 'Nitrate', sym: 'NO₃⁻', charge: '-1' },
                  { name: 'Carbonate', sym: 'CO₃²⁻', charge: '-2' },
                  { name: 'Sulfate', sym: 'SO₄²⁻', charge: '-2' },
                  { name: 'Ammonium', sym: 'NH₄⁺', charge: '+1' },
                  { name: 'Phosphate', sym: 'PO₄³⁻', charge: '-3' },
                ].map(ion => (
                  <div key={ion.name} className="bg-white rounded-lg p-2 text-center">
                    <div className="font-bold text-purple-700">{ion.sym}</div>
                    <div className="text-gray-500">{ion.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula writing rules */}
            <div className="bg-green-50 rounded-xl p-3">
              <h4 className="font-bold text-green-700 text-xs mb-2">Writing Formulas - Simple Steps</h4>
              <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
                <li>Write the positive ion first, then the negative ion</li>
                <li>Overall charges must balance to <strong>zero</strong></li>
                <li>Cross-multiply the charges to find the ratio</li>
                <li>Write as subscripts (don't write ₁)</li>
                <li>The ending <strong>"-ide"</strong> = single atom (e.g. chloride = Cl⁻)</li>
                <li>The ending <strong>"-ate"</strong> = contains oxygen (e.g. sulfate = SO₄²⁻)</li>
              </ol>
            </div>
          </motion.div>
        )}

        {tab === 'ions' && (
          <motion.div key="ions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-xs text-gray-500 mb-3 text-center">Tap to flip between name and symbol</p>

            <h4 className="font-bold text-sm text-blue-700 mb-2">Positive Ions (+)</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {positiveIons.map(ion => (
                <button
                  key={ion.name}
                  className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200 active:scale-95 transition-transform"
                  onClick={() => toggleIon(ion.name)}
                >
                  {flippedIons.has(ion.name) ? (
                    <div className="text-xs text-blue-600">{ion.name}</div>
                  ) : (
                    <div className="text-sm font-bold text-blue-700">{ion.symbol}</div>
                  )}
                  <div className="text-[10px] text-gray-400">+{ion.charge}</div>
                </button>
              ))}
            </div>

            <h4 className="font-bold text-sm text-red-700 mb-2">Negative Ions (-)</h4>
            <div className="grid grid-cols-3 gap-2">
              {negativeIons.map(ion => (
                <button
                  key={ion.name}
                  className="bg-red-50 rounded-lg p-2 text-center border border-red-200 active:scale-95 transition-transform"
                  onClick={() => toggleIon(ion.name)}
                >
                  {flippedIons.has(ion.name) ? (
                    <div className="text-xs text-red-600">{ion.name}</div>
                  ) : (
                    <div className="text-sm font-bold text-red-700">{ion.symbol}</div>
                  )}
                  <div className="text-[10px] text-gray-400">-{ion.charge}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'formula' && (
          <motion.div key="formula" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Write the formula for:</p>
              <h3 className="text-xl font-bold text-amber-800">{currentCompound.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {currentCompound.positiveIon} + {currentCompound.negativeIon}
              </p>
              <span className={`badge mt-2 ${currentCompound.difficulty === 'easy' ? 'bg-green-100 text-green-700' : currentCompound.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {currentCompound.difficulty}
              </span>
            </div>

            <input
              type="text"
              value={userAnswer}
              onChange={e => { setUserAnswer(e.target.value); setFormulaResult(null) }}
              placeholder="Type formula (e.g. NaCl, CaCl2)"
              className="w-full p-3 rounded-xl border-2 border-gray-200 text-center text-lg font-mono mb-3 focus:outline-none focus:border-amber-400"
            />

            {formulaResult && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-center p-3 rounded-xl mb-3 font-bold ${formulaResult === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {formulaResult === 'correct' ? 'Correct!' : `Not quite! The answer is ${currentCompound.formula}`}
              </motion.div>
            )}

            <div className="flex gap-2 mb-3">
              <button className="btn-primary flex-1" onClick={checkFormula}>Check</button>
              <button className="btn-secondary flex-1" onClick={nextFormula}>Next</button>
            </div>

            <button
              className="w-full text-xs text-gray-500 underline"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
            {showAnswer && (
              <p className="text-center text-lg font-mono font-bold text-amber-700 mt-2">{currentCompound.formula}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
