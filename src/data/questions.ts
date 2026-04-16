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

const questionBank: Question[] = [
  // ============================================================
  // ELECTRON ARRANGEMENT — reasoning about shells, groups, configs
  // ============================================================

  // Easy: basic shell rules
  { id: 'e1', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'The first electron shell can hold a maximum of 2 electrons. The second shell can hold a maximum of:',
    options: ['2', '6', '8', '18'], correctIndex: 2,
    explanation: 'After the first shell (max 2), the second and third shells each hold a maximum of 8.' },
  { id: 'e2', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'Lithium has atomic number 3 (meaning 3 electrons). Shell 1 fills first with 2. Where does the third electron go?',
    options: ['It stays in shell 1', 'It goes into shell 2', 'It goes into shell 3', 'It disappears'], correctIndex: 1,
    explanation: 'Shell 1 is full at 2 electrons, so the 3rd electron must go into shell 2. Lithium = 2,1.' },
  { id: 'e3', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'An element has 2 electrons in shell 1 and 8 in shell 2 (arrangement: 2,8). Its outer shell is full. What does this mean?',
    options: ['It is very reactive', 'It easily loses electrons', 'It is stable and unreactive', 'It gains electrons easily'], correctIndex: 2,
    explanation: 'A full outer shell = stable and unreactive. This element is Neon, a Noble Gas.' },
  { id: 'e4', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'Sodium has 11 electrons. Shells fill in order: 2, then 8, then the rest. What is sodium\'s electron arrangement?',
    options: ['2,9', '2,8,1', '11', '2,8,2'], correctIndex: 1,
    explanation: '11 electrons: first 2 fill shell 1, next 8 fill shell 2, last 1 goes into shell 3 → 2,8,1.' },
  { id: 'e5', topic: 'electron-arrangement', difficulty: 'easy', type: 'multiple-choice',
    question: 'An element is in Group 1 of the periodic table. How many electrons does it have in its outer shell?',
    options: ['1', '2', '7', '8'], correctIndex: 0,
    explanation: 'The group number tells you the number of outer electrons. Group 1 = 1 outer electron.' },

  // Medium: connecting arrangement to groups and properties
  { id: 'e6', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Chlorine has electron arrangement 2,8,7. The outer shell has 7 electrons. What group is chlorine in?',
    options: ['Group 2', 'Group 7', 'Group 8', 'Group 17'], correctIndex: 3,
    explanation: '7 outer electrons = Group 17 (the Halogens). Don\'t confuse 7 electrons with Group 7!' },
  { id: 'e7', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Calcium has atomic number 20. Filling shells in order (2, 8, 8, ...), what is its arrangement?',
    options: ['2,8,10', '2,8,8,2', '2,10,8', '2,8,2,8'], correctIndex: 1,
    explanation: '20 electrons: 2 in shell 1, 8 in shell 2, 8 in shell 3, 2 in shell 4 → 2,8,8,2.' },
  { id: 'e8', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Potassium (2,8,8,1) and sodium (2,8,1) are both in Group 1. Why do they react in a similar way?',
    options: ['They have the same number of shells', 'They both have 1 outer electron', 'They are both gases', 'They have the same atomic number'], correctIndex: 1,
    explanation: 'Elements in the same group have the same number of outer electrons, so they react similarly.' },
  { id: 'e9', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'An element has arrangement 2,8,2. It has 2 outer electrons. Which group name does it belong to?',
    options: ['Alkali Metals (Group 1)', 'Alkaline Earth Metals (Group 2)', 'Halogens (Group 17)', 'Noble Gases (Group 18)'], correctIndex: 1,
    explanation: '2 outer electrons = Group 2 = Alkaline Earth Metals. This is Magnesium.' },
  { id: 'e10', topic: 'electron-arrangement', difficulty: 'medium', type: 'multiple-choice',
    question: 'Argon has arrangement 2,8,8. Its outer shell is full. What would you predict about its reactivity?',
    options: ['Very reactive — it explodes in water', 'Fairly reactive — it forms compounds easily', 'Unreactive — it already has a full outer shell', 'It only reacts with metals'], correctIndex: 2,
    explanation: 'Full outer shell = no need to gain or lose electrons = unreactive (Noble Gas).' },

  // Hard: working backwards, multi-step reasoning
  { id: 'e11', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'An unknown element has arrangement 2,8,6. How many electrons would it need to GAIN to get a full outer shell?',
    options: ['2', '6', '8', '16'], correctIndex: 0,
    explanation: 'Outer shell has 6, needs 8 to be full. 8 - 6 = 2 more electrons needed.' },
  { id: 'e12', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'Element X has 2,8,7 and Element Y has 2,8,8. Which statement is correct?',
    options: ['X is a Noble Gas and Y is a Halogen', 'X is a Halogen and Y is a Noble Gas', 'Both are Noble Gases', 'Both are Halogens'], correctIndex: 1,
    explanation: 'X has 7 outer e⁻ = Group 17 (Halogen). Y has a full shell of 8 = Group 18 (Noble Gas).' },
  { id: 'e13', topic: 'electron-arrangement', difficulty: 'hard', type: 'multiple-choice',
    question: 'An element has 17 electrons. What is its arrangement and which group is it in?',
    options: ['2,8,7 — Group 17', '2,8,7 — Group 7', '2,7,8 — Group 8', '2,8,8 — Group 18'], correctIndex: 0,
    explanation: '17 electrons: 2 + 8 + 7. Outer shell has 7 = Group 17 (Chlorine, a Halogen).' },
  { id: 'e14', topic: 'electron-arrangement', difficulty: 'hard', type: 'true-false',
    question: 'An element with arrangement 2,1 and an element with 2,8,1 would react in a similar way because they have the same number of outer electrons.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Both have 1 outer electron (Group 1), so they react similarly — both are Alkali Metals.' },

  // ============================================================
  // IONS & FORMULAS — reasoning about charge, electron transfer
  // ============================================================

  // Easy: understanding WHY ions form
  { id: 'i1', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'Sodium has 1 outer electron. To get a full outer shell, it\'s easiest to lose that 1 electron. If it starts with 11 protons and 11 electrons, what charge does it have after losing 1 electron?',
    options: ['0 (neutral)', '+1', '-1', '+11'], correctIndex: 1,
    explanation: '11 protons (+11) but now only 10 electrons (-10). One more + than - = charge of +1 → Na⁺.' },
  { id: 'i2', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'Chlorine has 7 outer electrons. It only needs 1 more to fill the shell. After gaining 1 electron (17 protons, now 18 electrons), what is its charge?',
    options: ['+1', '-1', '+17', '0'], correctIndex: 1,
    explanation: '17 protons (+17) but 18 electrons (-18). One more - than + = charge of -1 → Cl⁻.' },
  { id: 'i3', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'Metals have 1-3 outer electrons. Non-metals have 5-7. Which is easier for a metal — lose a few or gain many?',
    options: ['Gain many electrons to fill the shell', 'Lose a few electrons to empty the shell', 'Metals don\'t form ions', 'Neither — metals stay neutral'], correctIndex: 1,
    explanation: 'With only 1-3 outer electrons, it\'s much easier to lose them than to gain 5-7 more.' },
  { id: 'i4', topic: 'ions-and-formulas', difficulty: 'easy', type: 'multiple-choice',
    question: 'Na⁺ has charge +1 and Cl⁻ has charge -1. For the overall compound to be neutral (charges = 0), how many of each do you need?',
    options: ['2 Na⁺ and 1 Cl⁻', '1 Na⁺ and 2 Cl⁻', '1 Na⁺ and 1 Cl⁻', '2 Na⁺ and 2 Cl⁻'], correctIndex: 2,
    explanation: '+1 and -1 already balance to zero. Ratio is 1:1 → formula is NaCl.' },
  { id: 'i5', topic: 'ions-and-formulas', difficulty: 'easy', type: 'true-false',
    question: 'When an atom LOSES electrons it becomes positive, because it now has more protons than electrons.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Protons don\'t change. If you remove electrons: more + than - = positive ion.' },

  // Medium: working out formulas from charges
  { id: 'i6', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'Magnesium has 2 outer electrons so it forms Mg²⁺. Chlorine forms Cl⁻. To balance +2, how many Cl⁻ ions are needed?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: 'Mg²⁺ is +2. Each Cl⁻ is -1. Need 2 × (-1) = -2 to balance. Formula: MgCl₂.' },
  { id: 'i7', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'Ca²⁺ (+2) needs to combine with O²⁻ (-2). The charges are already equal. What is the formula?',
    options: ['CaO₂', 'Ca₂O', 'CaO', 'Ca₂O₂'], correctIndex: 2,
    explanation: '+2 and -2 balance in a 1:1 ratio. No subscripts needed → CaO.' },
  { id: 'i8', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'Na⁺ (+1) needs to combine with O²⁻ (-2). How many Na⁺ ions balance one O²⁻?',
    options: ['1 Na⁺', '2 Na⁺', '3 Na⁺', '8 Na⁺'], correctIndex: 1,
    explanation: 'O²⁻ is -2. Need +2 to balance. Each Na⁺ gives +1, so need 2 of them → Na₂O.' },
  { id: 'i9', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'The compound name ends in "-ide" (like chloride, oxide). This tells you:',
    options: ['It contains oxygen from a polyatomic ion', 'The negative ion is a single type of atom', 'It is an acid', 'It is a Noble Gas compound'], correctIndex: 1,
    explanation: '"-ide" = single negative atom (chloride = Cl⁻, oxide = O²⁻). "-ate" = contains oxygen.' },
  { id: 'i10', topic: 'ions-and-formulas', difficulty: 'medium', type: 'multiple-choice',
    question: 'The name ends in "-ate" (like sulfate, nitrate). This tells you the negative ion:',
    options: ['Is a single atom', 'Contains only metals', 'Contains oxygen (polyatomic ion)', 'Has no charge'], correctIndex: 2,
    explanation: '"-ate" = polyatomic ion containing oxygen. Sulfate = SO₄²⁻, nitrate = NO₃⁻.' },

  // Hard: cross-multiply, polyatomic ions, brackets
  { id: 'i11', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'Al³⁺ (+3) combines with O²⁻ (-2). Cross-multiply: you need 2 Al and 3 O to balance charges (2×3 = 3×2 = 6). What is the formula?',
    options: ['AlO', 'Al₂O₃', 'Al₃O₂', 'Al₆O₆'], correctIndex: 1,
    explanation: '2 Al³⁺ gives +6, 3 O²⁻ gives -6. Balanced! Formula: Al₂O₃.' },
  { id: 'i12', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'Ca²⁺ combines with OH⁻ (-1). You need 2 OH⁻ to balance Ca²⁺. OH is a polyatomic ion, so what is the correct formula?',
    options: ['CaOH₂', 'Ca(OH)₂', 'Ca₂OH', 'CaO₂H₂'], correctIndex: 1,
    explanation: 'When you need multiple polyatomic ions, put brackets around them: Ca(OH)₂.' },
  { id: 'i13', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'NH₄⁺ (+1) combines with SO₄²⁻ (-2). How many NH₄⁺ ions are needed, and what is the formula?',
    options: ['1 — NH₄SO₄', '2 — (NH₄)₂SO₄', '3 — (NH₄)₃SO₄', '2 — NH₄₂SO₄'], correctIndex: 1,
    explanation: 'Need 2 × (+1) = +2 to balance -2. Brackets around polyatomic NH₄: (NH₄)₂SO₄.' },
  { id: 'i14', topic: 'ions-and-formulas', difficulty: 'hard', type: 'multiple-choice',
    question: 'Copper(II) means Cu²⁺. It combines with SO₄²⁻. Both charges are 2. What is the formula?',
    options: ['Cu₂SO₄', 'CuSO₄', 'Cu(SO₄)₂', 'Cu₂(SO₄)₂'], correctIndex: 1,
    explanation: '+2 and -2 balance 1:1. No brackets needed when there\'s only 1 polyatomic ion → CuSO₄.' },

  // ============================================================
  // BALANCING EQUATIONS — counting atoms, adjusting coefficients
  // ============================================================

  // Easy: understand the concept
  { id: 'b1', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: 'In a balanced equation, what must be the same on both sides?',
    options: ['The number of molecules', 'The number of each type of atom', 'The physical state', 'The temperature'], correctIndex: 1,
    explanation: 'Every type of atom must have the same count on left and right — atoms can\'t appear or vanish.' },
  { id: 'b2', topic: 'balancing-equations', difficulty: 'easy', type: 'true-false',
    question: 'To balance an equation, you can change the small subscript numbers inside a formula (like changing H₂O to H₃O).',
    options: ['True', 'False'], correctIndex: 1,
    explanation: 'Never change subscripts — that changes the substance! Only add big numbers (coefficients) in front.' },
  { id: 'b3', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: 'H₂ + O₂ → H₂O. Left side: 2H, 2O. Right side: 2H, 1O. Which atom is unbalanced?',
    options: ['Hydrogen', 'Oxygen', 'Both', 'Neither — it\'s balanced'], correctIndex: 1,
    explanation: 'H: 2 = 2 ✓. O: 2 ≠ 1 ✗. Oxygen is unbalanced.' },
  { id: 'b4', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: 'If you put a 2 in front of H₂O (making 2H₂O), how many H atoms and O atoms does that represent?',
    options: ['2H and 2O', '4H and 2O', '2H and 1O', '4H and 4O'], correctIndex: 1,
    explanation: '2 × H₂O = 2 × (2H + 1O) = 4H and 2O. The coefficient multiplies everything in the formula.' },
  { id: 'b5', topic: 'balancing-equations', difficulty: 'easy', type: 'multiple-choice',
    question: '2H₂ + O₂ → 2H₂O. Count: Left has 4H and 2O. Right has 4H and 2O. Is this balanced?',
    options: ['No — H is wrong', 'No — O is wrong', 'No — both are wrong', 'Yes — both sides match'], correctIndex: 3,
    explanation: 'H: 4 = 4 ✓. O: 2 = 2 ✓. All atoms match — it\'s balanced!' },

  // Medium: balance equations with guidance
  { id: 'b6', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: '_Na + _Cl₂ → _NaCl. Left: Na=1, Cl=2. Right: Na=1, Cl=1. Cl is unbalanced. What coefficients fix it?',
    options: ['1, 1, 1', '2, 1, 2', '1, 2, 2', '2, 2, 4'], correctIndex: 1,
    explanation: '2Na + Cl₂ → 2NaCl. Left: 2Na, 2Cl. Right: 2Na, 2Cl ✓.' },
  { id: 'b7', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: '_Mg + _HCl → _MgCl₂ + _H₂. MgCl₂ has 2 Cl, but HCl has 1. What coefficient for HCl balances chlorine?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: 'Need 2 Cl on left to match 2 Cl in MgCl₂. So put 2 in front of HCl. Then 2HCl gives 2H = H₂ ✓.' },
  { id: 'b8', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: 'In 3O₂, how many oxygen atoms are there in total?',
    options: ['3', '5', '6', '9'], correctIndex: 2,
    explanation: '3 × O₂ = 3 × 2 = 6 oxygen atoms. The coefficient (3) multiplies the subscript (2).' },
  { id: 'b9', topic: 'balancing-equations', difficulty: 'medium', type: 'multiple-choice',
    question: 'Ca + O₂ → CaO. Left: 1Ca, 2O. Right: 1Ca, 1O. To fix oxygen, try 2CaO. Now right has 2Ca, 2O. What goes on the left?',
    options: ['Ca + O₂', '2Ca + O₂', 'Ca + 2O₂', '2Ca + 2O₂'], correctIndex: 1,
    explanation: 'Right: 2Ca, 2O. So left needs 2Ca + O₂ (which has 2O). Balanced: 2Ca + O₂ → 2CaO.' },

  // Hard: complex equations
  { id: 'b10', topic: 'balancing-equations', difficulty: 'hard', type: 'multiple-choice',
    question: '_Fe + _O₂ → _Fe₂O₃. Fe₂O₃ has 2Fe and 3O. But O₂ only comes in pairs. What coefficients work?',
    options: ['2, 3, 1', '4, 3, 2', '3, 2, 1', '2, 1, 1'], correctIndex: 1,
    explanation: '4Fe + 3O₂ → 2Fe₂O₃. Left: 4Fe, 6O. Right: 4Fe, 6O ✓. The trick is getting O to an even number.' },
  { id: 'b11', topic: 'balancing-equations', difficulty: 'hard', type: 'multiple-choice',
    question: '_N₂ + _H₂ → _NH₃. N₂ has 2N. Each NH₃ has 1N, so we need 2NH₃. Now right has 6H. How many H₂ on the left?',
    options: ['2', '3', '4', '6'], correctIndex: 1,
    explanation: 'Right: 2NH₃ = 2N, 6H. Left needs 6H: 3 × H₂ = 6H ✓. Answer: N₂ + 3H₂ → 2NH₃.' },
  { id: 'b12', topic: 'balancing-equations', difficulty: 'hard', type: 'multiple-choice',
    question: '_CaCO₃ + _HCl → _CaCl₂ + _H₂O + _CO₂. CaCl₂ needs 2 Cl. How many HCl?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: '2HCl gives 2Cl for CaCl₂ and 2H for H₂O. Full: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.' },

  // ============================================================
  // ACIDS & BASES — reasoning about H⁺, OH⁻, strength, properties
  // ============================================================

  // Easy: core concepts
  { id: 'a1', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'When HCl dissolves in water, it splits into H⁺ and Cl⁻. The H⁺ ions make the solution acidic. What ion is responsible for acidity?',
    options: ['Cl⁻', 'H⁺', 'Na⁺', 'OH⁻'], correctIndex: 1,
    explanation: 'H⁺ (hydrogen ions) are what make a solution acidic. More H⁺ = more acidic.' },
  { id: 'a2', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'NaOH dissolves in water to produce Na⁺ and OH⁻. The OH⁻ ions make it basic. What ion is responsible for basicity?',
    options: ['Na⁺', 'H⁺', 'Cl⁻', 'OH⁻'], correctIndex: 3,
    explanation: 'OH⁻ (hydroxide ions) are what make a solution basic/alkaline.' },
  { id: 'a3', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'Acids produce H⁺ ions and have pH below 7. Bases produce OH⁻ ions and have pH above 7. What pH is neutral?',
    options: ['0', '1', '7', '14'], correctIndex: 2,
    explanation: 'pH 7 = neutral (pure water). Below 7 = acidic. Above 7 = basic.' },
  { id: 'a4', topic: 'acids-and-bases', difficulty: 'easy', type: 'multiple-choice',
    question: 'NaOH dissolves in water and is a base. A base that dissolves in water has a special name. What is it?',
    options: ['An acid', 'An alkali', 'A salt', 'A metal'], correctIndex: 1,
    explanation: 'An alkali is a base that dissolves in water. NaOH and KOH are common alkalis.' },
  { id: 'a5', topic: 'acids-and-bases', difficulty: 'easy', type: 'true-false',
    question: 'Acids taste sour (like lemon juice) and bases feel slippery (like soap). These are clues to identify them.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Acids are sour, bases are slippery. But never taste chemicals in a lab — use indicators instead!' },

  // Medium: strong vs weak, specific acids/bases
  { id: 'a6', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'HCl ionises 100% in water (every molecule splits). Vinegar only partially ionises. What makes HCl a "strong" acid?',
    options: ['It is more concentrated', 'It is more dangerous', 'It ionises completely (100%)', 'It has a higher pH'], correctIndex: 2,
    explanation: 'Strong acid = 100% ionisation. Weak acid = partial ionisation. Strength ≠ concentration!' },
  { id: 'a7', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'The 3 strong acids you need to know are hydrochloric (HCl), sulfuric (H₂SO₄), and:',
    options: ['Citric acid', 'Acetic acid', 'Nitric acid (HNO₃)', 'Carbonic acid'], correctIndex: 2,
    explanation: 'The 3 strong acids: HCl, H₂SO₄, HNO₃. They all ionise 100% in water.' },
  { id: 'a8', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'CO₂ dissolves in water to form H₂CO₃ (carbonic acid). This is why fizzy drinks are slightly acidic. What does CO₂ + H₂O produce?',
    options: ['A base', 'A weak acid', 'A strong acid', 'A neutral solution'], correctIndex: 1,
    explanation: 'CO₂ + H₂O → H₂CO₃ (carbonic acid), which is a weak acid. That\'s why fizzy water is slightly acidic.' },
  { id: 'a9', topic: 'acids-and-bases', difficulty: 'medium', type: 'multiple-choice',
    question: 'Mg(OH)₂ is magnesium hydroxide (milk of magnesia). It contains OH⁻ ions but doesn\'t fully dissolve. Is it a base or an alkali?',
    options: ['An acid', 'An alkali (dissolves)', 'A base (doesn\'t fully dissolve)', 'Neutral'], correctIndex: 2,
    explanation: 'It produces OH⁻ so it\'s a base. But it doesn\'t fully dissolve, so it\'s a base but NOT an alkali.' },

  // Hard: ionisation equations, applying knowledge
  { id: 'a10', topic: 'acids-and-bases', difficulty: 'hard', type: 'multiple-choice',
    question: 'H₂SO₄ has TWO hydrogen atoms. When it fully ionises, how many H⁺ ions does each molecule produce?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: 'H₂SO₄ → 2H⁺ + SO₄²⁻. Each molecule releases 2 hydrogen ions.' },
  { id: 'a11', topic: 'acids-and-bases', difficulty: 'hard', type: 'multiple-choice',
    question: 'A solution has a pH of 2. Another has pH of 5. Both are acidic. Which has MORE H⁺ ions?',
    options: ['pH 2 — lower pH means more H⁺', 'pH 5 — higher number means more', 'They have the same amount', 'Cannot tell from pH alone'], correctIndex: 0,
    explanation: 'Lower pH = more H⁺ = more acidic. pH 2 is a much stronger acid than pH 5.' },
  { id: 'a12', topic: 'acids-and-bases', difficulty: 'hard', type: 'multiple-choice',
    question: 'Ethanoic acid (vinegar, CH₃COOH) is a weak acid. In water, only some molecules ionise. What does the ⇌ arrow mean in: CH₃COOH ⇌ H⁺ + CH₃COO⁻?',
    options: ['The reaction is complete', 'The reaction goes both ways — not all molecules split', 'The reaction doesn\'t happen', 'It only works with heat'], correctIndex: 1,
    explanation: 'The double arrow ⇌ means the reaction is reversible — some molecules split, some reform. That\'s what makes it weak.' },

  // ============================================================
  // INDICATORS — reasoning about pH, colours, what they tell you
  // ============================================================

  // Easy: pH scale basics
  { id: 'ind1', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'The pH scale goes from 0-14. pH 7 is neutral. A substance with pH 3 is on which side of neutral?',
    options: ['Acidic (below 7)', 'Neutral (exactly 7)', 'Basic (above 7)', 'Cannot tell'], correctIndex: 0,
    explanation: 'pH 3 < 7, so it\'s acidic. The further below 7, the more acidic.' },
  { id: 'ind2', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'Litmus paper turns RED in acid and BLUE in base. You dip litmus into lemon juice (an acid). What colour?',
    options: ['Blue', 'Red', 'Green', 'No change'], correctIndex: 1,
    explanation: 'Lemon juice is acidic → litmus turns red.' },
  { id: 'ind3', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'Universal indicator is GREEN at pH 7. If you test pure water, what colour would you see?',
    options: ['Red', 'Yellow', 'Green', 'Purple'], correctIndex: 2,
    explanation: 'Pure water is pH 7 (neutral) → universal indicator is green.' },
  { id: 'ind4', topic: 'indicators', difficulty: 'easy', type: 'multiple-choice',
    question: 'Universal indicator goes: Red (pH 0-2) → Orange → Yellow → Green (pH 7) → Blue → Purple (pH 14). Battery acid is pH 1. What colour?',
    options: ['Red', 'Green', 'Blue', 'Purple'], correctIndex: 0,
    explanation: 'pH 1 is very acidic → universal indicator is red.' },
  { id: 'ind5', topic: 'indicators', difficulty: 'easy', type: 'true-false',
    question: 'A solution turns universal indicator purple. This means it is a strong base with a high pH (around 13-14).',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'Purple = high pH (13-14) = strong base. The colour scale goes red → green → purple.' },

  // Medium: applying indicator knowledge
  { id: 'ind6', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'Phenolphthalein is colourless in acid and neutral, but turns PINK in base. You add it to NaOH (a base). What colour?',
    options: ['Colourless', 'Pink/Red', 'Blue', 'Green'], correctIndex: 1,
    explanation: 'NaOH is a base → phenolphthalein turns pink/red.' },
  { id: 'ind7', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'A solution turns universal indicator orange-yellow (around pH 4). What type of substance is it?',
    options: ['A strong acid', 'A weak acid', 'Neutral', 'A base'], correctIndex: 1,
    explanation: 'pH 4 is below 7 but not extremely low → weak acid (like orange juice).' },
  { id: 'ind8', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'You test soap with litmus. It turns BLUE. You test it with phenolphthalein. What colour would you expect?',
    options: ['Colourless — soap is acidic', 'Pink — soap is basic', 'Green — soap is neutral', 'Red — soap is acidic'], correctIndex: 1,
    explanation: 'Litmus turning blue means soap is basic. Phenolphthalein turns pink in bases too.' },
  { id: 'ind9', topic: 'indicators', difficulty: 'medium', type: 'multiple-choice',
    question: 'A substance has pH 12. Is it closer to being a strong acid, a weak acid, neutral, or a strong base?',
    options: ['Strong acid', 'Weak acid', 'Neutral', 'Strong base'], correctIndex: 3,
    explanation: 'pH 12 is well above 7, close to 14 → strong base.' },

  // Hard: tricky indicator logic
  { id: 'ind10', topic: 'indicators', difficulty: 'hard', type: 'multiple-choice',
    question: 'Phenolphthalein is COLOURLESS. Can you tell if the solution is acidic or neutral?',
    options: ['Yes — it must be acidic', 'Yes — it must be neutral', 'No — it could be either acidic OR neutral', 'No — phenolphthalein doesn\'t work'], correctIndex: 2,
    explanation: 'Phenolphthalein is colourless in BOTH acidic and neutral solutions. You\'d need another test to tell.' },
  { id: 'ind11', topic: 'indicators', difficulty: 'hard', type: 'multiple-choice',
    question: 'Litmus turns red AND phenolphthalein stays colourless. What can you conclude?',
    options: ['The solution is definitely acidic', 'The solution is definitely basic', 'The solution is neutral', 'The tests contradict each other'], correctIndex: 0,
    explanation: 'Litmus red = acid. Phenolphthalein colourless = acid or neutral. Together: definitely acidic.' },
  { id: 'ind12', topic: 'indicators', difficulty: 'hard', type: 'multiple-choice',
    question: 'Two solutions both turn universal indicator blue-purple. Solution A is pH 10, Solution B is pH 13. Which has more OH⁻ ions?',
    options: ['A — lower number means more OH⁻', 'B — higher pH means more OH⁻', 'Same — both are basic', 'Cannot tell from pH'], correctIndex: 1,
    explanation: 'Higher pH = more basic = more OH⁻ ions. pH 13 has way more OH⁻ than pH 10.' },

  // ============================================================
  // NEUTRALISATION — reasoning about products, salt naming, equations
  // ============================================================

  // Easy: the core reaction
  { id: 'n1', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'Acids produce H⁺. Bases produce OH⁻. When they meet, H⁺ + OH⁻ combine. What do they form?',
    options: ['Salt', 'Oxygen', 'Water (H₂O)', 'Carbon dioxide'], correctIndex: 2,
    explanation: 'H⁺ + OH⁻ → H₂O. The hydrogen and hydroxide ions combine to make water!' },
  { id: 'n2', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'When acid + base react, they produce water AND another substance. The general equation is: ACID + BASE → ? + WATER',
    options: ['Metal', 'Gas', 'Salt', 'Oxygen'], correctIndex: 2,
    explanation: 'ACID + BASE → SALT + WATER. The salt is the other product.' },
  { id: 'n3', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'Bee stings are acidic. To neutralise something acidic, you need:',
    options: ['A stronger acid', 'More water', 'A base (like baking soda)', 'A neutral substance'], correctIndex: 2,
    explanation: 'Acids are neutralised by bases. Baking soda (NaHCO₃) is a base that neutralises the acid.' },
  { id: 'n4', topic: 'neutralisation', difficulty: 'easy', type: 'true-false',
    question: 'Neutralisation makes the solution closer to pH 7 because the H⁺ and OH⁻ cancel each other out.',
    options: ['True', 'False'], correctIndex: 0,
    explanation: 'H⁺ + OH⁻ → H₂O removes both ions, pushing pH toward neutral (7).' },
  { id: 'n5', topic: 'neutralisation', difficulty: 'easy', type: 'multiple-choice',
    question: 'Too much acid in the stomach causes indigestion. Antacid tablets contain a base. Why does this help?',
    options: ['The base adds more acid', 'The base neutralises the excess acid', 'The base makes you burp', 'The base cools the stomach'], correctIndex: 1,
    explanation: 'The base reacts with excess acid: ACID + BASE → SALT + WATER, reducing acidity.' },

  // Medium: naming salts using reasoning
  { id: 'n6', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'Hydrochloric acid (HCl) reacts with sodium hydroxide (NaOH). The salt name = metal from base + ending from acid. HCl gives "chloride". What is the salt?',
    options: ['Sodium sulfate', 'Sodium nitrate', 'Sodium chloride', 'Sodium oxide'], correctIndex: 2,
    explanation: 'Sodium (from NaOH) + chloride (from HCl) = sodium chloride (table salt!).' },
  { id: 'n7', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'Sulfuric acid (H₂SO₄) gives salts ending in "sulfate". It reacts with potassium hydroxide (KOH). What salt is formed?',
    options: ['Potassium chloride', 'Potassium sulfate', 'Potassium nitrate', 'Sodium sulfate'], correctIndex: 1,
    explanation: 'Potassium (from KOH) + sulfate (from H₂SO₄) = potassium sulfate.' },
  { id: 'n8', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'Acid + CARBONATE → salt + water + what extra gas?',
    options: ['Oxygen (O₂)', 'Hydrogen (H₂)', 'Carbon dioxide (CO₂)', 'Nitrogen (N₂)'], correctIndex: 2,
    explanation: 'Carbonates release CO₂ when they react with acids. You\'d see bubbling/fizzing!' },
  { id: 'n9', topic: 'neutralisation', difficulty: 'medium', type: 'multiple-choice',
    question: 'Farmers add lime (calcium carbonate, CaCO₃) to acidic soil. Why does this help plants grow?',
    options: ['It adds water to the soil', 'It neutralises the acid, bringing pH closer to 7', 'It makes the soil more acidic', 'It kills weeds'], correctIndex: 1,
    explanation: 'CaCO₃ is a base that neutralises soil acid. Most plants grow best in slightly acidic to neutral soil.' },

  // Hard: writing equations, complex salts
  { id: 'n10', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'Nitric acid (HNO₃) gives "nitrate" salts. It reacts with calcium hydroxide Ca(OH)₂. The metal is calcium. What salt?',
    options: ['Calcium chloride', 'Calcium carbonate', 'Calcium nitrate', 'Calcium sulfate'], correctIndex: 2,
    explanation: 'Calcium (from base) + nitrate (from HNO₃) = calcium nitrate.' },
  { id: 'n11', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'HCl + CaCO₃ → CaCl₂ + H₂O + CO₂. CaCl₂ needs 2 Cl. How many HCl molecules are needed on the left?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: '2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂. Need 2 HCl to provide 2 Cl atoms.' },
  { id: 'n12', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'Sulfuric acid + copper(II) oxide → ? + water. Copper(II) is the metal. Sulfuric acid gives sulfate. What is the salt?',
    options: ['Copper chloride', 'Copper nitrate', 'Copper sulfate', 'Copper carbonate'], correctIndex: 2,
    explanation: 'Copper (from copper oxide) + sulfate (from H₂SO₄) = copper(II) sulfate.' },
  { id: 'n13', topic: 'neutralisation', difficulty: 'hard', type: 'multiple-choice',
    question: 'A student adds hydrochloric acid to sodium hydrogen carbonate (NaHCO₃). They see bubbling. The bubbles are:',
    options: ['Hydrogen gas', 'Oxygen gas', 'Carbon dioxide gas', 'Water vapour'], correctIndex: 2,
    explanation: 'HCl + NaHCO₃ → NaCl + H₂O + CO₂. The bubbles are carbon dioxide from the carbonate.' },
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
