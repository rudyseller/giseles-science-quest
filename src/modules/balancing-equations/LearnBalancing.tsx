import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Equation {
  reactants: string;
  products: string;
  coeffSlots: number; // number of coefficient slots
  answer: number[]; // correct coefficients
  elements: string[]; // elements to count
  formulas: string[]; // individual formulas in order
  atomCounts: (coeffs: number[]) => Record<string, [number, number]>; // element -> [left, right]
}

const equations: Equation[] = [
  {
    reactants: '_H₂ + _O₂',
    products: '_H₂O',
    coeffSlots: 3,
    answer: [2, 1, 2],
    formulas: ['H₂', 'O₂', 'H₂O'],
    elements: ['H', 'O'],
    atomCounts: (c) => ({
      H: [c[0] * 2, c[2] * 2],
      O: [c[1] * 2, c[2] * 1],
    }),
  },
  {
    reactants: '_Na + _Cl₂',
    products: '_NaCl',
    coeffSlots: 3,
    answer: [2, 1, 2],
    formulas: ['Na', 'Cl₂', 'NaCl'],
    elements: ['Na', 'Cl'],
    atomCounts: (c) => ({
      Na: [c[0] * 1, c[2] * 1],
      Cl: [c[1] * 2, c[2] * 1],
    }),
  },
  {
    reactants: '_Fe + _O₂',
    products: '_Fe₂O₃',
    coeffSlots: 3,
    answer: [4, 3, 2],
    formulas: ['Fe', 'O₂', 'Fe₂O₃'],
    elements: ['Fe', 'O'],
    atomCounts: (c) => ({
      Fe: [c[0] * 1, c[2] * 2],
      O: [c[1] * 2, c[2] * 3],
    }),
  },
  {
    reactants: '_Mg + _HCl',
    products: '_MgCl₂ + _H₂',
    coeffSlots: 4,
    answer: [1, 2, 1, 1],
    formulas: ['Mg', 'HCl', 'MgCl₂', 'H₂'],
    elements: ['Mg', 'H', 'Cl'],
    atomCounts: (c) => ({
      Mg: [c[0] * 1, c[2] * 1],
      H: [c[1] * 1, c[3] * 2],
      Cl: [c[1] * 1, c[2] * 2],
    }),
  },
  {
    reactants: '_N₂ + _H₂',
    products: '_NH₃',
    coeffSlots: 3,
    answer: [1, 3, 2],
    formulas: ['N₂', 'H₂', 'NH₃'],
    elements: ['N', 'H'],
    atomCounts: (c) => ({
      N: [c[0] * 2, c[2] * 1],
      H: [c[1] * 2, c[2] * 3],
    }),
  },
  {
    reactants: '_CaCO₃ + _HCl',
    products: '_CaCl₂ + _H₂O + _CO₂',
    coeffSlots: 5,
    answer: [1, 2, 1, 1, 1],
    formulas: ['CaCO₃', 'HCl', 'CaCl₂', 'H₂O', 'CO₂'],
    elements: ['Ca', 'C', 'O', 'H', 'Cl'],
    atomCounts: (c) => ({
      Ca: [c[0] * 1, c[2] * 1],
      C: [c[0] * 1, c[4] * 1],
      O: [c[0] * 3, c[3] * 1 + c[4] * 2],
      H: [c[1] * 1, c[3] * 2],
      Cl: [c[1] * 1, c[2] * 2],
    }),
  },
]

export default function LearnBalancing() {
  const [tab, setTab] = useState<'learn' | 'practice'>('learn')
  const [eqIdx, setEqIdx] = useState(0)
  const [coeffs, setCoeffs] = useState<number[]>(equations[0].answer.map(() => 1))
  const [showResult, setShowResult] = useState(false)

  const eq = equations[eqIdx % equations.length]
  const counts = eq.atomCounts(coeffs)
  const isBalanced = eq.elements.every(el => counts[el][0] === counts[el][1])

  function adjustCoeff(idx: number, delta: number) {
    const next = [...coeffs]
    next[idx] = Math.max(1, Math.min(10, next[idx] + delta))
    setCoeffs(next)
    setShowResult(false)
  }

  function nextEquation() {
    const next = (eqIdx + 1) % equations.length
    setEqIdx(next)
    setCoeffs(equations[next].answer.map(() => 1))
    setShowResult(false)
  }

  const tabs = [
    { key: 'learn' as const, label: 'Learn' },
    { key: 'practice' as const, label: 'Practice' },
  ]

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-emerald-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-emerald-50 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-emerald-800 text-sm mb-2">What is Balancing?</h3>
              <p className="text-xs text-emerald-700 mb-3">
                In a chemical reaction, atoms are <strong>never created or destroyed</strong>.
                The same number of each type of atom must be on <strong>both sides</strong> of the equation.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <h4 className="font-bold text-blue-700 text-xs mb-2">The Rules</h4>
              <ol className="text-xs text-blue-700 space-y-2 list-decimal list-inside">
                <li>Only change the <strong>big numbers in front</strong> (coefficients)</li>
                <li><strong>Never</strong> change the small subscript numbers in formulas</li>
                <li>Count each type of atom on both sides</li>
                <li>Adjust coefficients until both sides are equal</li>
              </ol>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <h4 className="font-bold text-amber-700 text-xs mb-2">Worked Example</h4>
              <div className="text-center space-y-2 text-sm">
                <p className="text-gray-500">Unbalanced:</p>
                <p className="font-mono font-bold">H₂ + O₂ → H₂O</p>
                <p className="text-xs text-gray-500">Left: 2H, 2O | Right: 2H, 1O ❌</p>
                <p className="text-gray-500 mt-2">Balanced:</p>
                <p className="font-mono font-bold text-emerald-700">2H₂ + O₂ → 2H₂O</p>
                <p className="text-xs text-emerald-600">Left: 4H, 2O | Right: 4H, 2O ✓</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-3">
              <h4 className="font-bold text-purple-700 text-xs mb-1">Tips</h4>
              <ul className="text-xs text-purple-600 space-y-1 list-disc list-inside">
                <li>Balance one element at a time</li>
                <li>Leave hydrogen and oxygen for last</li>
                <li>If stuck, try doubling a coefficient</li>
              </ul>
            </div>
          </motion.div>
        )}

        {tab === 'practice' && (
          <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-xs text-gray-500 text-center mb-3">Tap +/- to adjust each coefficient until balanced</p>

            {/* Equation display */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex flex-wrap items-center justify-center gap-1 text-lg font-mono font-bold">
                {eq.formulas.map((formula, idx) => {
                  const isProduct = idx >= eq.formulas.length - (eq.products.split('+').length)
                  const separator = idx === eq.formulas.length - eq.products.split('+').length ? ' → ' :
                    idx > 0 && idx < eq.formulas.length - eq.products.split('+').length ? ' + ' :
                    idx > eq.formulas.length - eq.products.split('+').length ? ' + ' : ''

                  return (
                    <span key={idx} className="flex items-center gap-0.5">
                      {separator && <span className="text-gray-400 text-sm mx-1">{separator}</span>}
                      <span className="text-emerald-600">{coeffs[idx] > 1 ? coeffs[idx] : ''}</span>
                      <span>{formula}</span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Coefficient controls */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {eq.formulas.map((formula, idx) => (
                <div key={idx} className="bg-white rounded-xl p-2 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{formula}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold text-sm"
                      onClick={() => adjustCoeff(idx, -1)}
                    >-</button>
                    <span className="text-lg font-bold w-6 text-center">{coeffs[idx]}</span>
                    <button
                      className="w-7 h-7 rounded-full bg-green-100 text-green-600 font-bold text-sm"
                      onClick={() => adjustCoeff(idx, 1)}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Atom counter */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <h4 className="font-bold text-xs text-gray-600 mb-2 text-center">Atom Count</h4>
              <div className="space-y-1">
                {eq.elements.map(el => {
                  const [left, right] = counts[el]
                  const balanced = left === right
                  return (
                    <div key={el} className="flex items-center gap-2 text-sm">
                      <span className="font-bold w-6">{el}</span>
                      <span className={`flex-1 text-center rounded px-2 py-0.5 ${balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        Left: {left}
                      </span>
                      <span className={balanced ? 'text-green-600' : 'text-red-600'}>{balanced ? '=' : '≠'}</span>
                      <span className={`flex-1 text-center rounded px-2 py-0.5 ${balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        Right: {right}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {isBalanced && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-100 text-green-700 text-center p-4 rounded-xl font-bold mb-4 text-lg"
              >
                Balanced! Great job!
              </motion.div>
            )}

            <button className="btn-secondary w-full" onClick={nextEquation}>
              Next Equation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
