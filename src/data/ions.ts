export interface Ion {
  symbol: string;
  name: string;
  charge: number;
  isPolyatomic: boolean;
  formula?: string; // display formula if different from symbol
}

export const positiveIons: Ion[] = [
  { symbol: 'H⁺', name: 'hydrogen', charge: 1, isPolyatomic: false, formula: 'H+' },
  { symbol: 'Li⁺', name: 'lithium', charge: 1, isPolyatomic: false, formula: 'Li+' },
  { symbol: 'Na⁺', name: 'sodium', charge: 1, isPolyatomic: false, formula: 'Na+' },
  { symbol: 'K⁺', name: 'potassium', charge: 1, isPolyatomic: false, formula: 'K+' },
  { symbol: 'Ag⁺', name: 'silver', charge: 1, isPolyatomic: false, formula: 'Ag+' },
  { symbol: 'NH₄⁺', name: 'ammonium', charge: 1, isPolyatomic: true, formula: 'NH4+' },
  { symbol: 'Mg²⁺', name: 'magnesium', charge: 2, isPolyatomic: false, formula: 'Mg2+' },
  { symbol: 'Ca²⁺', name: 'calcium', charge: 2, isPolyatomic: false, formula: 'Ca2+' },
  { symbol: 'Ba²⁺', name: 'barium', charge: 2, isPolyatomic: false, formula: 'Ba2+' },
  { symbol: 'Fe²⁺', name: 'iron(II)', charge: 2, isPolyatomic: false, formula: 'Fe2+' },
  { symbol: 'Cu²⁺', name: 'copper(II)', charge: 2, isPolyatomic: false, formula: 'Cu2+' },
  { symbol: 'Zn²⁺', name: 'zinc', charge: 2, isPolyatomic: false, formula: 'Zn2+' },
  { symbol: 'Pb²⁺', name: 'lead', charge: 2, isPolyatomic: false, formula: 'Pb2+' },
  { symbol: 'Al³⁺', name: 'aluminium', charge: 3, isPolyatomic: false, formula: 'Al3+' },
  { symbol: 'Fe³⁺', name: 'iron(III)', charge: 3, isPolyatomic: false, formula: 'Fe3+' },
];

export const negativeIons: Ion[] = [
  { symbol: 'Cl⁻', name: 'chloride', charge: 1, isPolyatomic: false, formula: 'Cl-' },
  { symbol: 'Br⁻', name: 'bromide', charge: 1, isPolyatomic: false, formula: 'Br-' },
  { symbol: 'F⁻', name: 'fluoride', charge: 1, isPolyatomic: false, formula: 'F-' },
  { symbol: 'OH⁻', name: 'hydroxide', charge: 1, isPolyatomic: true, formula: 'OH-' },
  { symbol: 'NO₃⁻', name: 'nitrate', charge: 1, isPolyatomic: true, formula: 'NO3-' },
  { symbol: 'HCO₃⁻', name: 'hydrogen carbonate', charge: 1, isPolyatomic: true, formula: 'HCO3-' },
  { symbol: 'O²⁻', name: 'oxide', charge: 2, isPolyatomic: false, formula: 'O2-' },
  { symbol: 'S²⁻', name: 'sulfide', charge: 2, isPolyatomic: false, formula: 'S2-' },
  { symbol: 'CO₃²⁻', name: 'carbonate', charge: 2, isPolyatomic: true, formula: 'CO32-' },
  { symbol: 'SO₄²⁻', name: 'sulfate', charge: 2, isPolyatomic: true, formula: 'SO42-' },
  { symbol: 'PO₄³⁻', name: 'phosphate', charge: 3, isPolyatomic: true, formula: 'PO43-' },
];

export const allIons = [...positiveIons, ...negativeIons];

// Common ionic compounds for formula writing practice
export interface CompoundPractice {
  name: string;
  positiveIon: string; // name
  negativeIon: string; // name
  formula: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const compoundPractice: CompoundPractice[] = [
  { name: 'sodium chloride', positiveIon: 'sodium', negativeIon: 'chloride', formula: 'NaCl', difficulty: 'easy' },
  { name: 'potassium bromide', positiveIon: 'potassium', negativeIon: 'bromide', formula: 'KBr', difficulty: 'easy' },
  { name: 'calcium chloride', positiveIon: 'calcium', negativeIon: 'chloride', formula: 'CaCl₂', difficulty: 'easy' },
  { name: 'magnesium oxide', positiveIon: 'magnesium', negativeIon: 'oxide', formula: 'MgO', difficulty: 'easy' },
  { name: 'sodium oxide', positiveIon: 'sodium', negativeIon: 'oxide', formula: 'Na₂O', difficulty: 'medium' },
  { name: 'calcium fluoride', positiveIon: 'calcium', negativeIon: 'fluoride', formula: 'CaF₂', difficulty: 'medium' },
  { name: 'aluminium chloride', positiveIon: 'aluminium', negativeIon: 'chloride', formula: 'AlCl₃', difficulty: 'medium' },
  { name: 'aluminium oxide', positiveIon: 'aluminium', negativeIon: 'oxide', formula: 'Al₂O₃', difficulty: 'hard' },
  { name: 'sodium hydroxide', positiveIon: 'sodium', negativeIon: 'hydroxide', formula: 'NaOH', difficulty: 'medium' },
  { name: 'calcium hydroxide', positiveIon: 'calcium', negativeIon: 'hydroxide', formula: 'Ca(OH)₂', difficulty: 'hard' },
  { name: 'ammonium sulfate', positiveIon: 'ammonium', negativeIon: 'sulfate', formula: '(NH₄)₂SO₄', difficulty: 'hard' },
  { name: 'magnesium nitrate', positiveIon: 'magnesium', negativeIon: 'nitrate', formula: 'Mg(NO₃)₂', difficulty: 'hard' },
  { name: 'sodium sulfate', positiveIon: 'sodium', negativeIon: 'sulfate', formula: 'Na₂SO₄', difficulty: 'medium' },
  { name: 'potassium nitrate', positiveIon: 'potassium', negativeIon: 'nitrate', formula: 'KNO₃', difficulty: 'medium' },
  { name: 'iron(III) oxide', positiveIon: 'iron(III)', negativeIon: 'oxide', formula: 'Fe₂O₃', difficulty: 'hard' },
  { name: 'copper(II) sulfate', positiveIon: 'copper(II)', negativeIon: 'sulfate', formula: 'CuSO₄', difficulty: 'medium' },
];
