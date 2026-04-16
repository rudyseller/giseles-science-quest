import type { Difficulty } from '../utils/adaptive'

export interface Question {
  id: string
  topic: string
  difficulty: Difficulty
  type: 'multiple-choice' | 'true-false'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// === ELECTRON ARRANGEMENT ===
const questionBank: Question[] = [
  { id: 'e1', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'How many electrons can the first shell hold?',
    options: ['1', '2', '8', '18'], correctIndex: 1,
    explanation: 'The first shell can hold a maximum of 2 electrons.' },
  { id: 'e2', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'What is the electron arrangement of sodium (Na, atomic number 11)?',
    options: ['2,8,1', '2,8,2', '2,1,8', '8,2,1'], correctIndex: 0,
    explanation: 'Sodium has 11 electrons: 2 in shell 1, 8 in shell 2, 1 in shell 3.' },
  { id: 'e3', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'Which group are the Noble Gases in?',
    options: ['Group 1', 'Group 2', 'Group 17', 'Group 18'], correctIndex: 3,
    explanation: 'Noble Gases are in Group 18 and have full outer shells.' },
  { id: 'e4', topic: 'electron-arrangement', difficulty: 'easy', type: 'true-false',
    question: 'Elements in the same group have the same number of outer electrons.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'The group number tells you how many electrons are in the outer shell.' },
  { id: 'e5', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'How many outer electrons does chlorine (Group 17) have?',
    options: ['1', '2', '7', '17'], correctIndex: 2,
    explanation: 'Group 17 elements have 7 outer electrons.' },
  { id: 'e6', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the electron arrangement of calcium (Ca, atomic number 20)?',
    options: ['2,8,8,2', '2,8,10', '2,8,2,8', '2,10,8'], correctIndex: 0,
    explanation: 'Calcium: 2 in shell 1, 8 in shell 2, 8 in shell 3, 2 in shell 4.' },
  { id: 'e7', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Potassium is in Group 1. How many electrons will it lose to form an ion?',
    options: ['0', '1', '7', '8'], correctIndex: 1,
    explanation: 'Group 1 elements have 1 outer electron and lose it to form a +1 ion.' },
  { id: 'e8', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Which of these is an Alkaline Earth Metal?',
    options: ['Sodium', 'Magnesium', 'Chlorine', 'Neon'], correctIndex: 1,
    explanation: 'Magnesium is in Group 2 (Alkaline Earth Metals).' },
  { id: 'e9', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'Why are Noble Gases unreactive?',
    options: ['They have no electrons', 'They have full outer shells', 'They are all gases', 'They have no protons'], correctIndex: 1,
    explanation: 'Noble Gases have full outer electron shells, so they don\'t need to gain or lose electrons.' },
  { id: 'e10', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'An element has the electron arrangement 2,8,6. What group is it in?',
    options: ['Group 2', 'Group 6', 'Group 8', 'Group 16'], correctIndex: 3,
    explanation: '6 outer electrons = Group 16. This is sulfur.' },
  { id: 'e11', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'Which element has 2 electron shells, both full?',
    options: ['Helium', 'Neon', 'Argon', 'Sodium'], correctIndex: 1,
    explanation: 'Neon (2,8) has 2 full shells.' },

  // === IONS & FORMULAS ===
  { id: 'i1', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'What charge does a sodium ion have?',
    options: ['+1', '+2', '-1', '-2'], correctIndex: 0,
    explanation: 'Sodium loses 1 electron → Na⁺ (charge +1).' },
  { id: 'i2', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'What charge does a chloride ion have?',
    options: ['+1', '+2', '-1', '-2'], correctIndex: 2,
    explanation: 'Chlorine gains 1 electron → Cl⁻ (charge -1).' },
  { id: 'i3', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'What is the formula for sodium chloride?',
    options: ['NaCl', 'NaCl₂', 'Na₂Cl', 'NaClO'], correctIndex: 0,
    explanation: 'Na⁺ and Cl⁻ both have charge 1, so the ratio is 1:1 = NaCl.' },
  { id: 'i4', topic: 'ions-and-formulas', difficulty: 'easy', type: 'true-false',
    question: 'Metals form positive ions by losing electrons.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Metals (Groups 1, 2, 13) lose their outer electrons to form positive ions.' },
  { id: 'i5', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the formula for calcium chloride?',
    options: ['CaCl', 'CaCl₂', 'Ca₂Cl', 'Ca₂Cl₂'], correctIndex: 1,
    explanation: 'Ca²⁺ needs 2 Cl⁻ to balance: CaCl₂.' },
  { id: 'i6', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the name of the ion SO₄²⁻?',
    options: ['Sulfide', 'Sulfate', 'Sulfite', 'Carbonate'], correctIndex: 1,
    explanation: 'SO₄²⁻ is the sulfate ion.' },
  { id: 'i7', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the formula for magnesium oxide?',
    options: ['MgO', 'MgO₂', 'Mg₂O', 'Mg₂O₂'], correctIndex: 0,
    explanation: 'Mg²⁺ and O²⁻ both have charge 2, so ratio is 1:1 = MgO.' },
  { id: 'i8', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'The ending "-ide" tells you the compound contains:',
    options: ['Oxygen', 'Only one type of negative atom', 'Two metals', 'A polyatomic ion'], correctIndex: 1,
    explanation: '"-ide" means a single type of negative atom (e.g. chloride = Cl⁻).' },
  { id: 'i9', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'What is the formula for aluminium oxide?',
    options: ['AlO', 'Al₂O₃', 'Al₃O₂', 'AlO₃'], correctIndex: 1,
    explanation: 'Al³⁺ and O²⁻: cross-multiply 3 and 2 → Al₂O₃.' },
  { id: 'i10', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'What is the formula for calcium hydroxide?',
    options: ['CaOH', 'Ca(OH)₂', 'Ca₂OH', 'CaOH₂'], correctIndex: 1,
    explanation: 'Ca²⁺ needs 2 OH⁻ ions. Brackets around the polyatomic ion: Ca(OH)₂.' },
  { id: 'i11', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'What is the formula for ammonium sulfate?',
    options: ['NH₄SO₄', '(NH₄)₂SO₄', 'NH₄(SO₄)₂', '(NH₄)SO₄'], correctIndex: 1,
    explanation: 'NH₄⁺ (+1) and SO₄²⁻ (-2): need 2 NH₄⁺ → (NH₄)₂SO₄.' },

  // === BALANCING EQUATIONS ===
  { id: 'b1', topic: 'balancing-equations', difficulty: 'easy', type: 'true-false',
    question: 'When balancing equations, you can change the subscripts in a formula.',
    options: ['True', 'False'], correctIndex: 1,
    explanation: 'You can only change coefficients (big numbers in front), never subscripts.' },
  { id: 'b2', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: 'What does "balanced" mean in a chemical equation?',
    options: ['Same number of molecules on each side', 'Same number of each type of atom on each side', 'Same mass of products and reactants', 'Both B and C'], correctIndex: 3,
    explanation: 'Balanced means the same number of each atom type on both sides (which also means same mass).' },
  { id: 'b3', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: 'In the equation _H₂ + _O₂ → _H₂O, what are the correct coefficients?',
    options: ['1, 1, 1', '2, 1, 2', '1, 2, 1', '2, 2, 1'], correctIndex: 1,
    explanation: '2H₂ + O₂ → 2H₂O gives 4H and 2O on each side.' },
  { id: 'b4', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: 'Balance: _Na + _Cl₂ → _NaCl',
    options: ['1, 1, 1', '2, 1, 2', '1, 2, 2', '2, 2, 1'], correctIndex: 1,
    explanation: '2Na + Cl₂ → 2NaCl: 2Na and 2Cl on each side.' },
  { id: 'b5', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: 'Balance: _Mg + _HCl → _MgCl₂ + _H₂',
    options: ['1, 1, 1, 1', '1, 2, 1, 1', '2, 2, 2, 1', '1, 2, 1, 2'], correctIndex: 1,
    explanation: 'Mg + 2HCl → MgCl₂ + H₂: 1Mg, 2H, 2Cl on each side.' },
  { id: 'b6', topic: 'balancing-equations', difficulty: 'hard', type: 'multiple-choice',
    question: 'Balance: _Fe + _O₂ → _Fe₂O₃',
    options: ['2, 3, 1', '4, 3, 2', '3, 2, 1', '2, 1, 1'], correctIndex: 1,
    explanation: '4Fe + 3O₂ → 2Fe₂O₃: 4Fe and 6O on each side.' },
  { id: 'b7', topic: 'balancing-equations', difficulty: 'hard', type: 'multiple-choice',
    question: 'Balance: _N₂ + _H₂ → _NH₃',
    options: ['1, 3, 2', '1, 2, 3', '2, 3, 1', '1, 1, 2'], correctIndex: 0,
    explanation: 'N₂ + 3H₂ → 2NH₃: 2N and 6H on each side.' },

  // === ACIDS & BASES ===
  { id: 'a1', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'What ion do acids produce in water?',
    options: ['OH⁻', 'H⁺', 'Na⁺', 'Cl⁻'], correctIndex: 1,
    explanation: 'Acids ionise in water to produce hydrogen ions (H⁺).' },
  { id: 'a2', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'What ion do bases produce in water?',
    options: ['H⁺', 'Na⁺', 'OH⁻', 'SO₄²⁻'], correctIndex: 2,
    explanation: 'Bases produce hydroxide ions (OH⁻) in water.' },
  { id: 'a3', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'Which of these is a strong acid?',
    options: ['Citric acid', 'Acetic acid', 'Hydrochloric acid', 'Carbonic acid'], correctIndex: 2,
    explanation: 'HCl is a strong acid - it ionises 100% in water.' },
  { id: 'a4', topic: 'acids-and-bases', difficulty: 'easy', type: 'true-false',
    question: 'A base that dissolves in water is called an alkali.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Alkalis are soluble bases. Examples: NaOH, KOH.' },
  { id: 'a5', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the formula for sulfuric acid?',
    options: ['HCl', 'H₂SO₄', 'HNO₃', 'H₂CO₃'], correctIndex: 1,
    explanation: 'Sulfuric acid is H₂SO₄.' },
  { id: 'a6', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'Which is the difference between a strong and weak acid?',
    options: ['Concentration', 'How much it ionises in water', 'How dangerous it is', 'Its colour'], correctIndex: 1,
    explanation: 'Strong acids ionise 100% in water. Weak acids only partially ionise.' },
  { id: 'a7', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'What is the common name for NaOH?',
    options: ['Baking soda', 'Caustic soda', 'Washing soda', 'Lime'], correctIndex: 1,
    explanation: 'NaOH is sodium hydroxide, commonly known as caustic soda.' },
  { id: 'a8', topic: 'acids-and-bases', difficulty: 'hard', type: 'multiple-choice',
    question: 'When HCl dissolves in water, what ions are produced?',
    options: ['H⁺ and Cl⁻', 'H₂ and Cl₂', 'Na⁺ and Cl⁻', 'H⁺ and OH⁻'], correctIndex: 0,
    explanation: 'HCl → H⁺ + Cl⁻ when it ionises in water.' },
  { id: 'a9', topic: 'acids-and-bases', difficulty: 'hard', type: 'multiple-choice',
    question: 'Which gas produces an acidic solution when dissolved in water?',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correctIndex: 2,
    explanation: 'CO₂ + H₂O → H₂CO₃ (carbonic acid). This is why fizzy drinks are slightly acidic.' },

  // === INDICATORS ===
  { id: 'ind1', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'What colour does litmus turn in an acid?',
    options: ['Blue', 'Red', 'Green', 'Purple'], correctIndex: 1,
    explanation: 'Litmus turns red in acidic solutions.' },
  { id: 'ind2', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'What pH is neutral?',
    options: ['0', '1', '7', '14'], correctIndex: 2,
    explanation: 'pH 7 is neutral (pure water).' },
  { id: 'ind3', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'Acids have a pH:',
    options: ['Below 7', 'Equal to 7', 'Above 7', 'Of exactly 1'], correctIndex: 0,
    explanation: 'Acids have pH below 7. The lower the pH, the stronger the acid.' },
  { id: 'ind4', topic: 'indicators', difficulty: 'easy', type: 'true-false',
    question: 'Universal indicator shows a range of colours depending on pH.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Universal indicator changes from red (acid) through green (neutral) to purple (base).' },
  { id: 'ind5', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'What colour does phenolphthalein turn in a base?',
    options: ['Colourless', 'Pink/Red', 'Blue', 'Yellow'], correctIndex: 1,
    explanation: 'Phenolphthalein is colourless in acid, pink/red in base.' },
  { id: 'ind6', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'What colour would universal indicator show at pH 1?',
    options: ['Red', 'Green', 'Blue', 'Purple'], correctIndex: 0,
    explanation: 'pH 1 is strongly acidic → universal indicator is red.' },
  { id: 'ind7', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'A substance has a pH of 10. It is:',
    options: ['A strong acid', 'A weak acid', 'Neutral', 'A base'], correctIndex: 3,
    explanation: 'pH above 7 = base/alkaline. pH 10 is a base.' },
  { id: 'ind8', topic: 'indicators', difficulty: 'hard', type: 'multiple-choice',
    question: 'Phenolphthalein is colourless. The solution could be:',
    options: ['Only acidic', 'Acidic or neutral', 'Only basic', 'Only neutral'], correctIndex: 1,
    explanation: 'Phenolphthalein is colourless in both acidic AND neutral solutions.' },
  { id: 'ind9', topic: 'indicators', difficulty: 'hard', type: 'multiple-choice',
    question: 'What colour would universal indicator be at pH 13?',
    options: ['Red', 'Orange', 'Green', 'Purple'], correctIndex: 3,
    explanation: 'pH 13 is strongly basic → universal indicator is purple.' },

  // === NEUTRALISATION ===
  { id: 'n1', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'What are the products of acid + base?',
    options: ['Salt + oxygen', 'Salt + water', 'Salt + carbon dioxide', 'Water + oxygen'], correctIndex: 1,
    explanation: 'ACID + BASE → SALT + WATER.' },
  { id: 'n2', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'What ions combine during neutralisation?',
    options: ['Na⁺ and Cl⁻', 'H⁺ and OH⁻', 'H⁺ and Cl⁻', 'Na⁺ and OH⁻'], correctIndex: 1,
    explanation: 'H⁺ + OH⁻ → H₂O is the core neutralisation reaction.' },
  { id: 'n3', topic: 'neutralisation', difficulty: 'easy', type: 'true-false',
    question: 'Neutralisation always produces a salt and water.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Yes! ACID + BASE → SALT + WATER (carbonate reactions also make CO₂).' },
  { id: 'n4', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'HCl + NaOH → ? + H₂O',
    options: ['NaCl', 'NaOH', 'Na₂Cl', 'NaClO'], correctIndex: 0,
    explanation: 'Hydrochloric acid + sodium hydroxide → sodium chloride + water.' },
  { id: 'n5', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'What salt is formed from sulfuric acid + potassium hydroxide?',
    options: ['Potassium chloride', 'Potassium sulfate', 'Potassium nitrate', 'Potassium oxide'], correctIndex: 1,
    explanation: 'Sulfuric acid → sulfate. Potassium from the base → potassium sulfate.' },
  { id: 'n6', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'What extra product is formed when an acid reacts with a carbonate?',
    options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'], correctIndex: 2,
    explanation: 'ACID + CARBONATE → SALT + WATER + CO₂.' },
  { id: 'n7', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'Bee stings are acidic. What would you use to neutralise one?',
    options: ['Vinegar', 'Lemon juice', 'Baking soda', 'More acid'], correctIndex: 2,
    explanation: 'Baking soda (NaHCO₃) is a base that neutralises the acid in bee stings.' },
  { id: 'n8', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'What is the word equation for HCl + CaCO₃?',
    options: [
      'Hydrochloric acid + calcium carbonate → calcium chloride + water + carbon dioxide',
      'Hydrochloric acid + calcium carbonate → calcium chloride + water',
      'Hydrochloric acid + calcium carbonate → calcium oxide + water',
      'Hydrochloric acid + calcium → calcium chloride + hydrogen',
    ], correctIndex: 0,
    explanation: 'Acid + carbonate → salt + water + CO₂.' },
  { id: 'n9', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'What salt is formed from: nitric acid + copper(II) oxide?',
    options: ['Copper chloride', 'Copper sulfate', 'Copper nitrate', 'Copper oxide'], correctIndex: 2,
    explanation: 'Nitric acid → nitrate. Copper from the base → copper(II) nitrate.' },
  { id: 'n10', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'Which balanced equation is correct for: HCl + NaOH → NaCl + H₂O?',
    options: [
      'HCl + NaOH → NaCl + H₂O (already balanced)',
      '2HCl + NaOH → NaCl₂ + H₂O',
      'HCl + 2NaOH → Na₂Cl + 2H₂O',
      'HCl + NaOH → NaCl + 2H₂O',
    ], correctIndex: 0,
    explanation: 'This equation is already balanced: 1 of each atom type on each side.' },
]

export const allQuestions: Question[] = questionBank

export function getQuestionsByTopic(topicId: string): Question[] {
  return allQuestions.filter(q => q.topic === topicId)
}

export function getQuestionsByDifficulty(topicId: string, difficulty: Difficulty): Question[] {
  return allQuestions.filter(q => q.topic === topicId && q.difficulty === difficulty)
}

export function getRandomQuestions(topicId: string, difficulty: Difficulty, count: number): Question[] {
  const pool = getQuestionsByDifficulty(topicId, difficulty)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getMixedQuestions(count: number, weakTopics?: string[]): Question[] {
  // Guarantee at least 1 question from EVERY topic
  const topicIds = [...new Set(allQuestions.map(q => q.topic))]
  const picked: Question[] = []
  const usedIds = new Set<string>()

  // Step 1: pick 1 random question from each topic
  for (const topic of topicIds) {
    const pool = allQuestions.filter(q => q.topic === topic)
    const q = pool[Math.floor(Math.random() * pool.length)]
    if (q) {
      picked.push(q)
      usedIds.add(q.id)
    }
  }

  // Step 2: fill remaining slots, weighted toward weak topics
  const remaining = count - picked.length
  const unused = allQuestions.filter(q => !usedIds.has(q.id))
  const shuffled = [...unused].sort(() => Math.random() - 0.5)

  if (weakTopics && weakTopics.length > 0) {
    const weak = shuffled.filter(q => weakTopics.includes(q.topic))
    const other = shuffled.filter(q => !weakTopics.includes(q.topic))
    const weakCount = Math.min(Math.ceil(remaining * 0.6), weak.length)
    picked.push(...weak.slice(0, weakCount))
    picked.push(...other.slice(0, remaining - weakCount))
  } else {
    picked.push(...shuffled.slice(0, remaining))
  }

  // Shuffle the final set so topic order is random
  return picked.sort(() => Math.random() - 0.5).slice(0, count)
}
