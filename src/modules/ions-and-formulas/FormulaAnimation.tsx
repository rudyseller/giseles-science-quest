import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormulaExample {
  name: string
  posIon: { symbol: string; name: string; charge: number }
  negIon: { symbol: string; name: string; charge: number }
  posCount: number
  negCount: number
  formula: string
  needsBrackets: boolean
}

const examples: FormulaExample[] = [
  {
    name: 'sodium chloride',
    posIon: { symbol: 'Na', name: 'sodium', charge: 1 },
    negIon: { symbol: 'Cl', name: 'chloride', charge: 1 },
    posCount: 1, negCount: 1,
    formula: 'NaCl',
    needsBrackets: false,
  },
  {
    name: 'calcium chloride',
    posIon: { symbol: 'Ca', name: 'calcium', charge: 2 },
    negIon: { symbol: 'Cl', name: 'chloride', charge: 1 },
    posCount: 1, negCount: 2,
    formula: 'CaCl₂',
    needsBrackets: false,
  },
  {
    name: 'sodium oxide',
    posIon: { symbol: 'Na', name: 'sodium', charge: 1 },
    negIon: { symbol: 'O', name: 'oxide', charge: 2 },
    posCount: 2, negCount: 1,
    formula: 'Na₂O',
    needsBrackets: false,
  },
  {
    name: 'aluminium oxide',
    posIon: { symbol: 'Al', name: 'aluminium', charge: 3 },
    negIon: { symbol: 'O', name: 'oxide', charge: 2 },
    posCount: 2, negCount: 3,
    formula: 'Al₂O₃',
    needsBrackets: false,
  },
  {
    name: 'calcium hydroxide',
    posIon: { symbol: 'Ca', name: 'calcium', charge: 2 },
    negIon: { symbol: 'OH', name: 'hydroxide', charge: 1 },
    posCount: 1, negCount: 2,
    formula: 'Ca(OH)₂',
    needsBrackets: true,
  },
]

function ChargeBox({ symbol, charge, isPositive, count, showCount }: {
  symbol: string; charge: number; isPositive: boolean; count: number; showCount: boolean
}) {
  const bg = isPositive ? '#dbeafe' : '#fee2e2'
  const border = isPositive ? '#3b82f6' : '#ef4444'
  const text = isPositive ? '#1d4ed8' : '#dc2626'
  return (
    <div className="text-center">
      <div
        className="rounded-xl px-4 py-3 border-2 inline-block min-w-[70px]"
        style={{ background: bg, borderColor: border }}
      >
        <div className="text-2xl font-bold" style={{ color: text }}>
          {showCount && count > 1 && <span className="text-sm text-gray-500">{count} × </span>}
          {symbol}
          <sup className="text-sm">{isPositive ? `${charge}+` : `${charge}−`}</sup>
        </div>
      </div>
      {showCount && count > 1 && (
        <div className="text-[10px] text-gray-500 mt-1">
          total charge: {isPositive ? '+' : '−'}{charge * count}
        </div>
      )}
    </div>
  )
}

export default function FormulaAnimation() {
  const [exIdx, setExIdx] = useState(0)
  const [step, setStep] = useState(0)

  const ex = examples[exIdx]

  const steps = [
    {
      title: `Step 1: Find the ions`,
      subtitle: `What is "${ex.name}" made of?`,
    },
    {
      title: `Step 2: Write down their charges`,
      subtitle: `How much + and − does each ion have?`,
    },
    {
      title: `Step 3: Balance the charges to zero`,
      subtitle: ex.posIon.charge === ex.negIon.charge
        ? `Charges are equal — ratio is 1:1, done!`
        : `Cross-multiply: the + charge number tells you how many − ions, and vice versa`,
    },
    {
      title: `Step 4: Write the formula`,
      subtitle: `Positive ion first, then negative. Use subscripts for counts > 1.${ex.needsBrackets ? ' Use brackets around polyatomic ions.' : ''}`,
    },
  ]

  const current = steps[step]

  function nextExample() {
    setExIdx(i => (i + 1) % examples.length)
    setStep(0)
  }

  return (
    <div className="bg-amber-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-sm text-amber-800">Formula Builder — Worked Example</h4>
        <span className="text-[10px] text-gray-400">Step {step + 1}/{steps.length}</span>
      </div>

      {/* Compound name */}
      <div className="text-center mb-3">
        <span className="text-xs text-gray-500">Building the formula for:</span>
        <h3 className="text-lg font-bold text-amber-800">{ex.name}</h3>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl p-4 mb-3 min-h-[180px]">
        <p className="text-xs font-bold text-amber-700 mb-1">{current.title}</p>
        <p className="text-[11px] text-gray-600 mb-3">{current.subtitle}</p>

        {/* Step 1: Show the ions */}
        {step >= 0 && (
          <motion.div
            key={`step0-${exIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <ChargeBox
              symbol={ex.posIon.symbol}
              charge={ex.posIon.charge}
              isPositive={true}
              count={step >= 2 ? ex.posCount : 1}
              showCount={step >= 2}
            />
            <span className="text-xl text-gray-400 font-bold">+</span>
            <ChargeBox
              symbol={ex.negIon.symbol}
              charge={ex.negIon.charge}
              isPositive={false}
              count={step >= 2 ? ex.negCount : 1}
              showCount={step >= 2}
            />
          </motion.div>
        )}

        {/* Step 2: Show charges */}
        {step >= 1 && step < 3 && (
          <motion.div
            key={`step1-${exIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-sm font-bold text-blue-600">+{ex.posIon.charge}</span>
              <span className="text-gray-400">and</span>
              <span className="text-sm font-bold text-red-600">−{ex.negIon.charge}</span>
              {ex.posIon.charge === ex.negIon.charge ? (
                <span className="text-xs text-green-600 font-bold ml-1">→ Already balanced!</span>
              ) : (
                <span className="text-xs text-orange-600 font-bold ml-1">→ Not equal, need to balance</span>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Cross-multiply visual */}
        {step >= 2 && (
          <motion.div
            key={`step2-${exIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-2"
          >
            {ex.posIon.charge !== ex.negIon.charge && (
              <div className="mb-2">
                <svg viewBox="0 0 200 60" className="w-48 mx-auto">
                  {/* Cross arrows */}
                  <line x1="60" y1="15" x2="140" y2="45" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                  <line x1="60" y1="45" x2="140" y2="15" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow)" />
                  {/* Labels */}
                  <text x="40" y="18" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3b82f6">+{ex.posIon.charge}</text>
                  <text x="40" y="50" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ef4444">−{ex.negIon.charge}</text>
                  <text x="160" y="18" textAnchor="middle" fontSize="12" fill="#6b7280">need {ex.negIon.charge} of {ex.posIon.symbol}</text>
                  <text x="160" y="50" textAnchor="middle" fontSize="12" fill="#6b7280">need {ex.posIon.charge} of {ex.negIon.symbol}</text>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
            )}
            <div className="bg-green-50 rounded-lg px-3 py-2 inline-block">
              <span className="text-xs text-green-700">
                Total: <strong className="text-blue-600">+{ex.posIon.charge * ex.posCount}</strong>
                {' + '}
                <strong className="text-red-600">−{ex.negIon.charge * ex.negCount}</strong>
                {' = '}
                <strong className="text-green-700">0 ✓</strong>
              </span>
            </div>
          </motion.div>
        )}

        {/* Step 4: Final formula */}
        {step >= 3 && (
          <motion.div
            key={`step3-${exIdx}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mt-3"
          >
            <div className="bg-amber-100 rounded-xl p-3 inline-block border-2 border-amber-300">
              <span className="text-3xl font-bold text-amber-800 font-mono">{ex.formula}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 space-y-0.5">
              {ex.posCount > 1 && <p>Subscript {ex.posCount} after {ex.posIon.symbol} (need {ex.posCount} of them)</p>}
              {ex.negCount > 1 && <p>Subscript {ex.negCount} after {ex.negIon.symbol}{ex.needsBrackets ? ' (with brackets around OH)' : ''}</p>}
              {ex.posCount === 1 && ex.negCount === 1 && <p>No subscripts needed — 1:1 ratio</p>}
              <p className="text-green-600 font-bold">Don't write the charges in the final formula!</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        <button
          className="flex-1 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 disabled:opacity-30"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
        >
          ← Back
        </button>
        {step < steps.length - 1 ? (
          <button
            className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-amber-500"
            onClick={() => setStep(s => s + 1)}
          >
            Next Step →
          </button>
        ) : (
          <button
            className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-pink-500"
            onClick={nextExample}
          >
            Try Another Example →
          </button>
        )}
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i <= step ? '#f59e0b' : '#e2e8f0' }}
          />
        ))}
      </div>

      {/* Example counter */}
      <p className="text-[10px] text-center text-gray-400 mt-1">
        Example {exIdx + 1} of {examples.length} — includes easy and hard formulas
      </p>
    </div>
  )
}
