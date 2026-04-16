import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { elements, groupColors, getElectronArrangement, getOuterElectrons } from '../../data/elements'

type Tab = 'learn' | 'build' | 'classify'

export default function LearnElectrons() {
  const [tab, setTab] = useState<Tab>('learn')
  const [selectedElement, setSelectedElement] = useState(elements[10]) // sodium
  const [buildTarget, setBuildTarget] = useState(elements[Math.floor(Math.random() * 20)])
  const [buildShells, setBuildShells] = useState<number[]>([0, 0, 0, 0])
  const [buildResult, setBuildResult] = useState<'correct' | 'wrong' | null>(null)
  const [classifyIdx, setClassifyIdx] = useState(0)
  const [classifyScore, setClassifyScore] = useState(0)
  const [classifyFeedback, setClassifyFeedback] = useState<string | null>(null)

  const classifyElements = elements.filter(e => [1, 2, 17, 18].includes(e.group) && e.number > 2)
  const maxPerShell = [2, 8, 8, 8]

  const tabs: { key: Tab; label: string }[] = [
    { key: 'learn', label: 'Learn' },
    { key: 'build', label: 'Build Atom' },
    { key: 'classify', label: 'Classify' },
  ]

  function checkBuild() {
    const target = buildTarget.electrons
    const attempt = buildShells.slice(0, target.length)
    const isCorrect = target.every((v, i) => attempt[i] === v)
    setBuildResult(isCorrect ? 'correct' : 'wrong')
  }

  function nextBuild() {
    const next = elements[Math.floor(Math.random() * 20)]
    setBuildTarget(next)
    setBuildShells([0, 0, 0, 0])
    setBuildResult(null)
  }

  function handleClassify(group: string) {
    if (classifyFeedback) return // prevent double-tap
    const el = classifyElements[classifyIdx % classifyElements.length]
    const correctGroup =
      el.group === 1 ? 'Alkali Metals' :
      el.group === 2 ? 'Alkaline Earth Metals' :
      el.group === 17 ? 'Halogens' : 'Noble Gases'
    if (group === correctGroup) {
      setClassifyScore(s => s + 1)
      setClassifyFeedback('Correct!')
    } else {
      setClassifyFeedback(`Nope! ${el.name} is a ${correctGroup} (Group ${el.group})`)
    }
    setTimeout(() => {
      setClassifyFeedback(null)
      setClassifyIdx(i => i + 1)
    }, 2500)
  }

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.key ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {tab === 'learn' && (
          <div>
            {/* Key concept */}
            <div className="bg-indigo-50 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-indigo-800 text-sm mb-2">Key Idea</h3>
              <p className="text-xs text-indigo-700">
                Electrons fill shells around the nucleus. The <strong>first shell holds max 2</strong>,
                then <strong>8 in each shell</strong> after that. The number of electrons in the{' '}
                <strong>outer shell = the group number</strong> in the periodic table.
              </p>
            </div>

            {/* Group reference */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { group: 1, name: 'Alkali Metals', outer: '1', color: '#f97316' },
                { group: 2, name: 'Alkaline Earth', outer: '2', color: '#3b82f6' },
                { group: 17, name: 'Halogens', outer: '7', color: '#ef4444' },
                { group: 18, name: 'Noble Gases', outer: 'Full', color: '#a855f7' },
              ].map(g => (
                <div key={g.group} className="rounded-lg p-2 text-center" style={{ background: g.color + '15', border: `2px solid ${g.color}` }}>
                  <div className="text-xs font-bold" style={{ color: g.color }}>Group {g.group}</div>
                  <div className="text-[10px] text-gray-600">{g.name}</div>
                  <div className="text-xs font-bold mt-1">{g.outer} outer e⁻</div>
                </div>
              ))}
            </div>

            {/* Element picker */}
            <h4 className="font-bold text-sm mb-2">Tap an element to see its electrons:</h4>
            <div className="grid grid-cols-5 gap-1 mb-4">
              {elements.map(el => (
                <button
                  key={el.number}
                  className={`p-1 rounded-lg text-center transition-all ${selectedElement.number === el.number ? 'ring-2 ring-indigo-500 scale-105' : ''}`}
                  style={{ background: groupColors[el.category] + '20', border: `1px solid ${groupColors[el.category]}` }}
                  onClick={() => setSelectedElement(el)}
                >
                  <div className="text-[10px] text-gray-500">{el.number}</div>
                  <div className="text-sm font-bold" style={{ color: groupColors[el.category] }}>{el.symbol}</div>
                </button>
              ))}
            </div>

            {/* Bohr model */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <h4 className="font-bold text-lg mb-1" style={{ color: groupColors[selectedElement.category] }}>
                {selectedElement.name} ({selectedElement.symbol})
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Atomic number: {selectedElement.number} | Electron arrangement: {getElectronArrangement(selectedElement)} | Outer electrons: {getOuterElectrons(selectedElement)}
              </p>

              {/* Visual shells */}
              <svg viewBox="0 0 240 240" className="w-52 h-52 mx-auto">
                {/* Nucleus */}
                <circle cx="120" cy="120" r="16" fill={groupColors[selectedElement.category]} />
                <text x="120" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  {selectedElement.symbol}
                </text>

                {/* Shells */}
                {selectedElement.electrons.map((count, shellIdx) => {
                  const radius = 32 + shellIdx * 22
                  return (
                    <g key={shellIdx}>
                      <circle cx="120" cy="120" r={radius} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
                      {Array.from({ length: count }).map((_, eIdx) => {
                        const angle = (eIdx / count) * Math.PI * 2 - Math.PI / 2
                        const ex = 120 + radius * Math.cos(angle)
                        const ey = 120 + radius * Math.sin(angle)
                        return (
                          <motion.circle
                            key={eIdx}
                            cx={ex}
                            cy={ey}
                            r="5"
                            fill="#6366f1"
                          />
                        )
                      })}
                      <text x={120 + radius + 8} y={120} fontSize="8" fill="#94a3b8">
                        {count}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
        )}

        {tab === 'build' && (
          <div>
            <div className="bg-green-50 rounded-xl p-4 mb-4 text-center">
              <h3 className="font-bold text-green-800 mb-1">Build the Atom!</h3>
              <p className="text-sm text-green-700">
                Add electrons to each shell for <strong>{buildTarget.name}</strong> (atomic number {buildTarget.number})
              </p>
            </div>

            <div className="space-y-3 mb-4">
              {buildTarget.electrons.map((_, shellIdx) => (
                <div key={shellIdx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-gray-500 w-16">Shell {shellIdx + 1}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold"
                    onClick={() => {
                      const next = [...buildShells]
                      next[shellIdx] = Math.max(0, next[shellIdx] - 1)
                      setBuildShells(next)
                      setBuildResult(null)
                    }}
                  >-</button>
                  <div className="flex-1 flex items-center justify-center gap-1">
                    {Array.from({ length: buildShells[shellIdx] }).map((_, i) => (
                      <div key={i} className="w-4 h-4 rounded-full bg-indigo-500" />
                    ))}
                    {buildShells[shellIdx] === 0 && <span className="text-xs text-gray-400">empty</span>}
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold"
                    onClick={() => {
                      const next = [...buildShells]
                      next[shellIdx] = Math.min(maxPerShell[shellIdx], next[shellIdx] + 1)
                      setBuildShells(next)
                      setBuildResult(null)
                    }}
                  >+</button>
                  <span className="text-xs text-gray-400 w-8">max {maxPerShell[shellIdx]}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-sm mb-2">
              Your arrangement: {buildShells.slice(0, buildTarget.electrons.length).filter(v => v > 0).join(',') || '...'}
            </div>

            {buildResult && (
              <motion.div
                className={`text-center p-3 rounded-xl mb-3 font-bold ${buildResult === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {buildResult === 'correct'
                  ? 'Correct! Well done!'
                  : `Not quite! The answer is ${getElectronArrangement(buildTarget)}`}
              </motion.div>
            )}

            <div className="flex gap-2">
              <button className="btn-primary flex-1" onClick={checkBuild}>Check</button>
              <button className="btn-secondary flex-1" onClick={nextBuild}>Next Atom</button>
            </div>
          </div>
        )}

        {tab === 'classify' && (
          <div>
            {/* Reasoning reminder */}
            <div className="bg-indigo-50 rounded-xl p-3 mb-3">
              <p className="text-xs text-indigo-700">
                <strong>How to work it out:</strong> Look at the electron arrangement →
                count the <strong>outer electrons</strong> → that tells you the <strong>group number</strong> → match to the group name.
              </p>
            </div>

            <div className="text-center mb-4">
              <p className="text-xs text-gray-500 mb-1">Score: {classifyScore}</p>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Which group does this element belong to?</p>
                <div className="text-4xl font-bold" style={{ color: groupColors[classifyElements[classifyIdx % classifyElements.length].category] }}>
                  {classifyElements[classifyIdx % classifyElements.length].symbol}
                </div>
                <p className="text-sm text-gray-500 mb-2">{classifyElements[classifyIdx % classifyElements.length].name}</p>

                {/* Show the clues - electron arrangement */}
                <div className="bg-white rounded-lg p-2 inline-block">
                  <p className="text-xs text-gray-400 mb-0.5">Electron arrangement:</p>
                  <p className="text-sm font-mono font-bold text-indigo-600">
                    {getElectronArrangement(classifyElements[classifyIdx % classifyElements.length])}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Outer electrons: <strong className="text-indigo-600">{getOuterElectrons(classifyElements[classifyIdx % classifyElements.length])}</strong>
                    {' → '}Group <strong className="text-indigo-600">{classifyElements[classifyIdx % classifyElements.length].group}</strong>
                  </p>
                </div>
              </div>
            </div>

            {classifyFeedback ? (
              <motion.div
                className={`text-center p-4 rounded-xl font-bold ${classifyFeedback.startsWith('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                <p>{classifyFeedback}</p>
                {classifyFeedback.startsWith('Correct') && (
                  <p className="text-xs font-normal mt-1 text-green-600">
                    {getOuterElectrons(classifyElements[(classifyIdx) % classifyElements.length])} outer electron{getOuterElectrons(classifyElements[(classifyIdx) % classifyElements.length]) !== 1 ? 's' : ''} → Group {classifyElements[(classifyIdx) % classifyElements.length].group} ✓
                  </p>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Alkali Metals', hint: '1 outer e⁻ → Group 1', color: '#f97316' },
                  { name: 'Alkaline Earth Metals', hint: '2 outer e⁻ → Group 2', color: '#3b82f6' },
                  { name: 'Halogens', hint: '7 outer e⁻ → Group 17', color: '#ef4444' },
                  { name: 'Noble Gases', hint: 'Full shell → Group 18', color: '#a855f7' },
                ].map(group => (
                  <button
                    key={group.name}
                    className="py-3 px-2 rounded-xl font-bold text-sm text-white active:scale-95 transition-transform"
                    style={{ background: group.color }}
                    onClick={() => handleClassify(group.name)}
                  >
                    {group.name}
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">{group.hint}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
