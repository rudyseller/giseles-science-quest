export interface Indicator {
  name: string;
  acidColour: string;
  neutralColour: string;
  baseColour: string;
  acidColourName: string;
  neutralColourName: string;
  baseColourName: string;
  description: string;
}

export const indicators: Indicator[] = [
  {
    name: 'Litmus',
    acidColour: '#ef4444',
    neutralColour: '#a855f7',
    baseColour: '#3b82f6',
    acidColourName: 'Red',
    neutralColourName: 'Purple',
    baseColourName: 'Blue',
    description: 'Simple indicator extracted from lichen. Turns red in acid, blue in base.',
  },
  {
    name: 'Phenolphthalein',
    acidColour: '#f8fafc',
    neutralColour: '#f8fafc',
    baseColour: '#ec4899',
    acidColourName: 'Colourless',
    neutralColourName: 'Colourless',
    baseColourName: 'Pink/Red',
    description: 'Colourless in acid and neutral solutions. Turns pink/red in base.',
  },
  {
    name: 'Universal Indicator',
    acidColour: '#ef4444',
    neutralColour: '#22c55e',
    baseColour: '#7c3aed',
    acidColourName: 'Red-Orange-Yellow',
    neutralColourName: 'Green',
    baseColourName: 'Blue-Purple',
    description: 'A mixture of indicators that shows a range of colours depending on pH.',
  },
];

// pH scale colours for universal indicator
export const pHColours: { pH: number; colour: string; label: string }[] = [
  { pH: 0, colour: '#dc2626', label: 'Strong acid' },
  { pH: 1, colour: '#ef4444', label: 'Strong acid' },
  { pH: 2, colour: '#f97316', label: 'Acid' },
  { pH: 3, colour: '#fb923c', label: 'Acid' },
  { pH: 4, colour: '#fbbf24', label: 'Weak acid' },
  { pH: 5, colour: '#facc15', label: 'Weak acid' },
  { pH: 6, colour: '#bef264', label: 'Weak acid' },
  { pH: 7, colour: '#22c55e', label: 'Neutral' },
  { pH: 8, colour: '#2dd4bf', label: 'Weak base' },
  { pH: 9, colour: '#38bdf8', label: 'Weak base' },
  { pH: 10, colour: '#3b82f6', label: 'Base' },
  { pH: 11, colour: '#6366f1', label: 'Base' },
  { pH: 12, colour: '#8b5cf6', label: 'Strong base' },
  { pH: 13, colour: '#a855f7', label: 'Strong base' },
  { pH: 14, colour: '#7c3aed', label: 'Strong base' },
];

export interface SubstancepH {
  name: string;
  pH: number;
  isAcid: boolean | null; // null = neutral
  funFact?: string;
}

export const commonSubstances: SubstancepH[] = [
  { name: 'Battery acid', pH: 1, isAcid: true },
  { name: 'Lemon juice', pH: 2, isAcid: true },
  { name: 'Vinegar', pH: 3, isAcid: true },
  { name: 'Orange juice', pH: 4, isAcid: true },
  { name: 'Black coffee', pH: 5, isAcid: true },
  { name: 'Milk', pH: 6, isAcid: true },
  { name: 'Pure water', pH: 7, isAcid: null, funFact: 'Perfectly neutral!' },
  { name: 'Sea water', pH: 8, isAcid: false },
  { name: 'Baking soda', pH: 9, isAcid: false },
  { name: 'Milk of magnesia', pH: 10, isAcid: false },
  { name: 'Ammonia', pH: 11, isAcid: false },
  { name: 'Soapy water', pH: 12, isAcid: false },
  { name: 'Bleach', pH: 13, isAcid: false },
  { name: 'Drain cleaner', pH: 14, isAcid: false },
];

export function getPHColour(pH: number): string {
  const clamped = Math.max(0, Math.min(14, Math.round(pH)));
  return pHColours[clamped].colour;
}

export function classifyPH(pH: number): 'acid' | 'neutral' | 'base' {
  if (pH < 7) return 'acid';
  if (pH === 7) return 'neutral';
  return 'base';
}
