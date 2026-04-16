export interface Acid {
  chemicalName: string;
  commonName: string;
  formula: string;
  strength: 'strong' | 'weak';
  appearance: string;
  ionisation: string; // e.g. "HCl → H⁺ + Cl⁻"
}

export const acids: Acid[] = [
  {
    chemicalName: 'hydrogen chloride',
    commonName: 'hydrochloric acid',
    formula: 'HCl',
    strength: 'strong',
    appearance: 'colourless gas (dissolved in water)',
    ionisation: 'HCl → H⁺ + Cl⁻',
  },
  {
    chemicalName: 'hydrogen sulfate',
    commonName: 'sulfuric acid',
    formula: 'H₂SO₄',
    strength: 'strong',
    appearance: 'colourless, oily liquid',
    ionisation: 'H₂SO₄ → 2H⁺ + SO₄²⁻',
  },
  {
    chemicalName: 'hydrogen nitrate',
    commonName: 'nitric acid',
    formula: 'HNO₃',
    strength: 'strong',
    appearance: 'colourless, fuming liquid',
    ionisation: 'HNO₃ → H⁺ + NO₃⁻',
  },
  {
    chemicalName: 'ethanoic acid',
    commonName: 'acetic acid (vinegar)',
    formula: 'CH₃COOH',
    strength: 'weak',
    appearance: 'colourless liquid',
    ionisation: 'CH₃COOH ⇌ H⁺ + CH₃COO⁻',
  },
  {
    chemicalName: 'citric acid',
    commonName: 'citric acid',
    formula: 'C₆H₈O₇',
    strength: 'weak',
    appearance: 'white crystalline solid',
    ionisation: 'Partially ionises in water',
  },
  {
    chemicalName: 'carbonic acid',
    commonName: 'carbonic acid (fizzy drinks)',
    formula: 'H₂CO₃',
    strength: 'weak',
    appearance: 'only exists in solution',
    ionisation: 'H₂CO₃ ⇌ H⁺ + HCO₃⁻',
  },
];

export interface Base {
  chemicalName: string;
  commonName: string;
  formula: string;
  isAlkali: boolean; // soluble in water
  appearance: string;
  ionisation: string;
}

export const bases: Base[] = [
  {
    chemicalName: 'sodium hydroxide',
    commonName: 'caustic soda',
    formula: 'NaOH',
    isAlkali: true,
    appearance: 'white solid',
    ionisation: 'NaOH → Na⁺ + OH⁻',
  },
  {
    chemicalName: 'potassium hydroxide',
    commonName: 'caustic potash',
    formula: 'KOH',
    isAlkali: true,
    appearance: 'white solid',
    ionisation: 'KOH → K⁺ + OH⁻',
  },
  {
    chemicalName: 'calcium hydroxide',
    commonName: 'slaked lime',
    formula: 'Ca(OH)₂',
    isAlkali: true,
    appearance: 'white powder',
    ionisation: 'Ca(OH)₂ → Ca²⁺ + 2OH⁻',
  },
  {
    chemicalName: 'ammonium hydroxide',
    commonName: 'ammonia solution',
    formula: 'NH₄OH',
    isAlkali: true,
    appearance: 'colourless liquid',
    ionisation: 'NH₃ + H₂O → NH₄⁺ + OH⁻',
  },
  {
    chemicalName: 'sodium carbonate',
    commonName: 'washing soda',
    formula: 'Na₂CO₃',
    isAlkali: true,
    appearance: 'white solid',
    ionisation: 'Dissolves to produce OH⁻ ions',
  },
  {
    chemicalName: 'calcium oxide',
    commonName: 'quicklite / lime',
    formula: 'CaO',
    isAlkali: false,
    appearance: 'white solid',
    ionisation: 'CaO + H₂O → Ca(OH)₂',
  },
  {
    chemicalName: 'magnesium hydroxide',
    commonName: 'milk of magnesia',
    formula: 'Mg(OH)₂',
    isAlkali: false,
    appearance: 'white powder',
    ionisation: 'Mg(OH)₂ → Mg²⁺ + 2OH⁻',
  },
];

export interface NeutralisationReaction {
  acid: string;
  base: string;
  salt: string;
  wordEquation: string;
  symbolEquation: string;
  hasCarbon: boolean; // produces CO₂ (carbonate reactions)
  difficulty: 'easy' | 'medium' | 'hard';
}

export const neutralisationReactions: NeutralisationReaction[] = [
  {
    acid: 'hydrochloric acid',
    base: 'sodium hydroxide',
    salt: 'sodium chloride',
    wordEquation: 'hydrochloric acid + sodium hydroxide → sodium chloride + water',
    symbolEquation: 'HCl + NaOH → NaCl + H₂O',
    hasCarbon: false,
    difficulty: 'easy',
  },
  {
    acid: 'hydrochloric acid',
    base: 'potassium hydroxide',
    salt: 'potassium chloride',
    wordEquation: 'hydrochloric acid + potassium hydroxide → potassium chloride + water',
    symbolEquation: 'HCl + KOH → KCl + H₂O',
    hasCarbon: false,
    difficulty: 'easy',
  },
  {
    acid: 'sulfuric acid',
    base: 'sodium hydroxide',
    salt: 'sodium sulfate',
    wordEquation: 'sulfuric acid + sodium hydroxide → sodium sulfate + water',
    symbolEquation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    hasCarbon: false,
    difficulty: 'medium',
  },
  {
    acid: 'nitric acid',
    base: 'calcium hydroxide',
    salt: 'calcium nitrate',
    wordEquation: 'nitric acid + calcium hydroxide → calcium nitrate + water',
    symbolEquation: '2HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + 2H₂O',
    hasCarbon: false,
    difficulty: 'medium',
  },
  {
    acid: 'hydrochloric acid',
    base: 'calcium oxide',
    salt: 'calcium chloride',
    wordEquation: 'hydrochloric acid + calcium oxide → calcium chloride + water',
    symbolEquation: '2HCl + CaO → CaCl₂ + H₂O',
    hasCarbon: false,
    difficulty: 'medium',
  },
  {
    acid: 'hydrochloric acid',
    base: 'calcium carbonate',
    salt: 'calcium chloride',
    wordEquation: 'hydrochloric acid + calcium carbonate → calcium chloride + water + carbon dioxide',
    symbolEquation: '2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂',
    hasCarbon: true,
    difficulty: 'hard',
  },
  {
    acid: 'hydrochloric acid',
    base: 'sodium hydrogen carbonate',
    salt: 'sodium chloride',
    wordEquation: 'hydrochloric acid + sodium hydrogen carbonate → sodium chloride + water + carbon dioxide',
    symbolEquation: 'HCl + NaHCO₃ → NaCl + H₂O + CO₂',
    hasCarbon: true,
    difficulty: 'hard',
  },
  {
    acid: 'sulfuric acid',
    base: 'copper(II) oxide',
    salt: 'copper(II) sulfate',
    wordEquation: 'sulfuric acid + copper(II) oxide → copper(II) sulfate + water',
    symbolEquation: 'H₂SO₄ + CuO → CuSO₄ + H₂O',
    hasCarbon: false,
    difficulty: 'hard',
  },
  {
    acid: 'sulfuric acid',
    base: 'magnesium hydroxide',
    salt: 'magnesium sulfate',
    wordEquation: 'sulfuric acid + magnesium hydroxide → magnesium sulfate + water',
    symbolEquation: 'H₂SO₄ + Mg(OH)₂ → MgSO₄ + 2H₂O',
    hasCarbon: false,
    difficulty: 'medium',
  },
  {
    acid: 'hydrochloric acid',
    base: 'magnesium hydroxide',
    salt: 'magnesium chloride',
    wordEquation: 'hydrochloric acid + magnesium hydroxide → magnesium chloride + water',
    symbolEquation: '2HCl + Mg(OH)₂ → MgCl₂ + 2H₂O',
    hasCarbon: false,
    difficulty: 'medium',
  },
];

// Salt naming rules
export const saltNamingRules = {
  acids: {
    'hydrochloric acid': 'chloride',
    'sulfuric acid': 'sulfate',
    'nitric acid': 'nitrate',
  } as Record<string, string>,
  explanation: 'The salt name = metal from the base + ending from the acid. HCl → chloride, H₂SO₄ → sulfate, HNO₃ → nitrate',
};
