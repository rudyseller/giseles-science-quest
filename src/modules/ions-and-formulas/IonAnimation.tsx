import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Step {
  title: string
  description: string
  highlight?: string
}

const naSteps: Step[] = [
  {
    title: 'Meet Sodium (Na)',
    description: 'Sodium has 11 protons and 11 electrons. Equal charges = neutral atom (no overall charge).',
    highlight: 'neutral',
  },
  {
    title: 'Look at the outer shell',
    description: 'Electron arrangement is 2, 8, 1. There\'s only 1 lonely electron in the outer shell. The shell needs 8 to be full.',
    highlight: 'outer',
  },
  {
    title: 'What\'s easier?',
    description: 'Gain 7 more electrons to fill it? Or just lose that 1? Losing 1 is WAY easier!',
    highlight: 'decision',
  },
  {
    title: 'The electron leaves!',
    description: 'Sodium loses its outer electron. Now the arrangement is 2, 8 — the outer shell is FULL and stable!',
    highlight: 'transfer',
  },
  {
    title: 'But now the charges don\'t balance',
    description: 'Still 11 protons (+11) but now only 10 electrons (-10). One more positive than negative = overall charge of +1. It\'s now Na⁺!',
    highlight: 'ion',
  },
]

const clSteps: Step[] = [
  {
    title: 'Meet Chlorine (Cl)',
    description: 'Chlorine has 17 protons and 17 electrons. Equal charges = neutral atom.',
    highlight: 'neutral',
  },
  {
    title: 'Look at the outer shell',
    description: 'Electron arrangement is 2, 8, 7. The outer shell has 7 electrons but needs 8 to be full. So close!',
    highlight: 'outer',
  },
  {
    title: 'What\'s easier?',
    description: 'Lose 7 electrons? Or just gain 1 more to fill the shell? Gaining 1 is much easier!',
    highlight: 'decision',
  },
  {
    title: 'An electron arrives!',
    description: 'Chlorine gains 1 electron. Now the arrangement is 2, 8, 8 — the outer shell is FULL and stable!',
    highlight: 'transfer',
  },
  {
    title: 'Now there are extra negative charges',
    description: 'Still 17 protons (+17) but now 18 electrons (-18). One more negative than positive = overall charge of -1. It\'s now Cl⁻!',
    highlight: 'ion',
  },
]

function BohrModel({
  shells,
  symbol,
  protons,
  electrons,
  charge,
  highlight,
  lostElectron,
  gainedElectron,
  color,
}: {
  shells: number[]
  symbol: string
  protons: number
  electrons: number
  charge: string
  highlight: string
  lostElectron: boolean
  gainedElectron: boolean
  color: string
}) {
  return (
    <div className="relative">
      <svg viewBox="0 0 220 220" className="w-52 h-52 mx-auto">
        {/* Nucleus */}
        <circle cx="110" cy="110" r="20" fill={color} />
        <text x="110" y="107" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
          {symbol}
        </text>
        <text x="110" y="120" textAnchor="middle" fill="white" fontSize="8">
          {protons}p⁺
        </text>

        {/* Shells */}
        {shells.map((count, shellIdx) => {
          const radius = 40 + shellIdx * 28
          const isOuterShell = shellIdx === shells.length - 1
          return (
            <g key={shellIdx}>
              <circle
                cx="110" cy="110" r={radius}
                fill="none"
                stroke={isOuterShell && (highlight === 'outer' || highlight === 'decision') ? color : '#cbd5e1'}
                strokeWidth={isOuterShell && (highlight === 'outer' || highlight === 'decision') ? 2 : 1}
                strokeDasharray="4,4"
              />
              {Array.from({ length: count }).map((_, eIdx) => {
                const angle = (eIdx / Math.max(count, 1)) * Math.PI * 2 - Math.PI / 2
                const ex = 110 + radius * Math.cos(angle)
                const ey = 110 + radius * Math.sin(angle)

                // For Na: the last electron on the outer shell flies away
                const isLeavingElectron = lostElectron && isOuterShell && eIdx === count - 1
                // For Cl: the extra electron on outer shell arrives
                const isArrivingElectron = gainedElectron && isOuterShell && eIdx === count - 1

                if (isLeavingElectron) {
                  return (
                    <motion.circle
                      key={eIdx}
                      r="6"
                      fill={color}
                      initial={{ cx: ex, cy: ey, opacity: 1 }}
                      animate={{ cx: 210, cy: 10, opacity: 0 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                  )
                }

                if (isArrivingElectron) {
                  return (
                    <motion.circle
                      key={eIdx}
                      r="6"
                      fill={color}
                      initial={{ cx: 10, cy: 10, opacity: 0 }}
                      animate={{ cx: ex, cy: ey, opacity: 1 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                  )
                }

                return (
                  <motion.circle
                    key={eIdx}
                    cx={ex}
                    cy={ey}
                    r="6"
                    fill={isOuterShell && highlight === 'outer' ? color : '#6366f1'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: shellIdx * 0.15 + eIdx * 0.03 }}
                  />
                )
              })}
              {/* Electron count label */}
              <text x={110 + radius} y={90} fontSize="9" fill="#94a3b8" textAnchor="middle">
                {count}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Proton/electron counter below */}
      <div className="text-center mt-1">
        <span className="text-xs text-gray-500">
          {protons}p⁺ {electrons}e⁻ =
        </span>
        <span className={`text-xs font-bold ${charge === '0' ? 'text-gray-600' : charge.startsWith('+') ? 'text-blue-600' : 'text-red-600'}`}>
          {charge === '0' ? ' neutral' : ` charge ${charge}`}
        </span>
      </div>
    </div>
  )
}

export default function IonAnimation({ mode }: { mode: 'sodium' | 'chlorine' }) {
  const [step, setStep] = useState(0)
  const steps = mode === 'sodium' ? naSteps : clSteps
  const current = steps[step]
  const color = mode === 'sodium' ? '#3b82f6' : '#ef4444'

  // Determine Bohr model state based on step
  const getShells = () => {
    if (mode === 'sodium') {
      if (step <= 3) return [2, 8, 1]
      return [2, 8] // after losing electron
    } else {
      if (step <= 3) return [2, 8, 7]
      return [2, 8, 8] // after gaining electron
    }
  }

  const getElectronCount = () => {
    if (mode === 'sodium') return step >= 4 ? 10 : 11
    return step >= 4 ? 18 : 17
  }

  const getCharge = () => {
    if (mode === 'sodium') return step >= 4 ? '+1' : '0'
    return step >= 4 ? '-1' : '0'
  }

  return (
    <div className="rounded-xl p-3" style={{ background: mode === 'sodium' ? '#eff6ff' : '#fef2f2' }}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-sm" style={{ color }}>
          {mode === 'sodium' ? 'Na → Na⁺' : 'Cl → Cl⁻'}
        </h4>
        <span className="text-[10px] text-gray-400">Step {step + 1}/{steps.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Bohr model */}
          <BohrModel
            shells={getShells()}
            symbol={mode === 'sodium' ? 'Na' : 'Cl'}
            protons={mode === 'sodium' ? 11 : 17}
            electrons={getElectronCount()}
            charge={getCharge()}
            highlight={current.highlight || ''}
            lostElectron={mode === 'sodium' && step === 3}
            gainedElectron={mode === 'chlorine' && step === 3}
            color={color}
          />

          {/* Step explanation */}
          <div className="bg-white rounded-xl p-3 mt-2">
            <h5 className="font-bold text-sm mb-1" style={{ color }}>{current.title}</h5>
            <p className="text-xs text-gray-700">{current.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-2 mt-3">
        <button
          className="flex-1 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 disabled:opacity-30"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
        >
          ← Back
        </button>
        <button
          className="flex-1 py-2 rounded-lg text-xs font-bold text-white disabled:opacity-30"
          style={{ background: color }}
          onClick={() => setStep(s => s + 1)}
          disabled={step === steps.length - 1}
        >
          {step === steps.length - 2 ? 'See the result →' : 'Next →'}
        </button>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i <= step ? color : '#e2e8f0' }}
          />
        ))}
      </div>
    </div>
  )
}
