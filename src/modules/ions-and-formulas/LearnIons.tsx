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
            {/* Step 1: WHY atoms form ions */}
            <div className="bg-amber-50 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-amber-800 text-sm mb-2">Why do atoms form ions?</h3>
              <p className="text-xs text-amber-700 mb-2">
                Atoms with <strong>full outer shells are stable</strong> (like Noble Gases - they don't react at all!).
                Other atoms "want" to get a full outer shell too. They do this by <strong>losing or gaining electrons</strong>.
              </p>
              <div className="bg-white rounded-lg p-2 text-center text-xs text-amber-800">
                The big question: is it easier to <strong>lose a few</strong> or <strong>gain a few</strong> to get a full shell?
              </div>
            </div>

            {/* Step 2: Positive ions with WHY */}
            <div className="bg-blue-50 rounded-xl p-3 mb-3">
              <h4 className="font-bold text-blue-700 text-xs mb-2">Positive Ions (Metals lose electrons)</h4>
              <div className="space-y-2 text-xs text-blue-700">
                <p>
                  <strong>Example: Sodium (Na)</strong> has arrangement <strong>2, 8, 1</strong>
                </p>
                <p>
                  It could gain 7 electrons to fill the shell... or just <strong>lose 1</strong>.
                  Losing 1 is much easier! Then it has arrangement 2, 8 — a full outer shell.
                </p>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-[11px] mb-1"><strong>But why does that make it positive?</strong></p>
                  <p className="text-[11px]">
                    Sodium starts with <strong>11 protons (+) and 11 electrons (-)</strong> = neutral.
                    After losing 1 electron: <strong>11 protons but only 10 electrons</strong>.
                    More positive than negative = overall charge of <strong>+1</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="text-center">
                  <div className="text-xl font-bold">Na</div>
                  <div className="text-[10px] text-gray-500">2,8,1</div>
                  <div className="text-[10px] text-gray-400">11p⁺ 11e⁻</div>
                </div>
                <div className="text-center">
                  <motion.div animate={{ x: [0, 10, 10] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <span className="text-xs">→ loses 1e⁻ →</span>
                  </motion.div>
                </div>
                <div className="text-center">
                  <div className="text-xl text-blue-600 font-bold">Na⁺</div>
                  <div className="text-[10px] text-gray-500">2,8 (full!)</div>
                  <div className="text-[10px] text-blue-500">11p⁺ 10e⁻ = +1</div>
                </div>
              </div>
              <p className="text-[10px] text-blue-500 mt-2 text-center">
                <strong>Rule:</strong> 1, 2, or 3 outer electrons → easier to lose them → positive ion
              </p>
            </div>

            {/* Step 3: Negative ions with WHY */}
            <div className="bg-red-50 rounded-xl p-3 mb-3">
              <h4 className="font-bold text-red-700 text-xs mb-2">Negative Ions (Non-metals gain electrons)</h4>
              <div className="space-y-2 text-xs text-red-700">
                <p>
                  <strong>Example: Chlorine (Cl)</strong> has arrangement <strong>2, 8, 7</strong>
                </p>
                <p>
                  It could lose 7 electrons... or just <strong>gain 1</strong> to fill the shell.
                  Gaining 1 is much easier! Then it has arrangement 2, 8, 8 — a full outer shell.
                </p>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-[11px] mb-1"><strong>But why does that make it negative?</strong></p>
                  <p className="text-[11px]">
                    Chlorine starts with <strong>17 protons (+) and 17 electrons (-)</strong> = neutral.
                    After gaining 1 electron: <strong>17 protons but 18 electrons</strong>.
                    More negative than positive = overall charge of <strong>-1</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="text-center">
                  <div className="text-xl font-bold">Cl</div>
                  <div className="text-[10px] text-gray-500">2,8,7</div>
                  <div className="text-[10px] text-gray-400">17p⁺ 17e⁻</div>
                </div>
                <div className="text-center">
                  <motion.div animate={{ x: [0, -10, -10] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <span className="text-xs">← gains 1e⁻ ←</span>
                  </motion.div>
                </div>
                <div className="text-center">
                  <div className="text-xl text-red-600 font-bold">Cl⁻</div>
                  <div className="text-[10px] text-gray-500">2,8,8 (full!)</div>
                  <div className="text-[10px] text-red-500">17p⁺ 18e⁻ = -1</div>
                </div>
              </div>
              <p className="text-[10px] text-red-500 mt-2 text-center">
                <strong>Rule:</strong> 5, 6, or 7 outer electrons → easier to gain a few → negative ion
              </p>
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
            {/* Reasoning reminder */}
            <div className="bg-amber-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-amber-700">
                <strong>Steps:</strong> 1) Find the ions and their charges → 2) Cross-multiply the charges
                to find the ratio → 3) Write as subscripts. Charges must balance to <strong>zero</strong>.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Write the formula for:</p>
              <h3 className="text-xl font-bold text-amber-800">{currentCompound.name}</h3>
              {/* Show ion symbols and charges as reasoning hints */}
              {(() => {
                const posIon = positiveIons.find(i => i.name === currentCompound.positiveIon)
                const negIon = negativeIons.find(i => i.name === currentCompound.negativeIon)
                return (
                  <div className="bg-white rounded-lg p-2 mt-2 inline-block">
                    <p className="text-xs text-gray-400">Ions needed:</p>
                    <p className="text-sm">
                      <span className="font-bold text-blue-600">{posIon?.symbol || currentCompound.positiveIon}</span>
                      <span className="text-gray-400"> {' + '} </span>
                      <span className="font-bold text-red-600">{negIon?.symbol || currentCompound.negativeIon}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Charges: +{posIon?.charge || '?'} and -{negIon?.charge || '?'} → must balance to zero
                    </p>
                  </div>
                )
              })()}
              <div className="mt-2">
                <span className={`badge ${currentCompound.difficulty === 'easy' ? 'bg-green-100 text-green-700' : currentCompound.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {currentCompound.difficulty}
                </span>
              </div>
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
