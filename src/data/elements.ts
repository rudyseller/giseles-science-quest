export interface Element {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  electrons: number[];  // electrons per shell e.g. [2, 8, 1]
  group: number;
  period: number;
  category: 'alkali-metal' | 'alkaline-earth' | 'transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas' | 'other';
  groupName?: string;
}

export const elements: Element[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1, electrons: [1], group: 1, period: 1, category: 'nonmetal' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4, electrons: [2], group: 18, period: 1, category: 'noble-gas', groupName: 'Noble Gases' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 7, electrons: [2, 1], group: 1, period: 2, category: 'alkali-metal', groupName: 'Alkali Metals' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9, electrons: [2, 2], group: 2, period: 2, category: 'alkaline-earth', groupName: 'Alkaline Earth Metals' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 11, electrons: [2, 3], group: 13, period: 2, category: 'metalloid' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12, electrons: [2, 4], group: 14, period: 2, category: 'nonmetal' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14, electrons: [2, 5], group: 15, period: 2, category: 'nonmetal' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 16, electrons: [2, 6], group: 16, period: 2, category: 'nonmetal' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 19, electrons: [2, 7], group: 17, period: 2, category: 'halogen', groupName: 'Halogens' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20, electrons: [2, 8], group: 18, period: 2, category: 'noble-gas', groupName: 'Noble Gases' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 23, electrons: [2, 8, 1], group: 1, period: 3, category: 'alkali-metal', groupName: 'Alkali Metals' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24, electrons: [2, 8, 2], group: 2, period: 3, category: 'alkaline-earth', groupName: 'Alkaline Earth Metals' },
  { number: 13, symbol: 'Al', name: 'Aluminium', mass: 27, electrons: [2, 8, 3], group: 13, period: 3, category: 'other' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28, electrons: [2, 8, 4], group: 14, period: 3, category: 'metalloid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 31, electrons: [2, 8, 5], group: 15, period: 3, category: 'nonmetal' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32, electrons: [2, 8, 6], group: 16, period: 3, category: 'nonmetal' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.5, electrons: [2, 8, 7], group: 17, period: 3, category: 'halogen', groupName: 'Halogens' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 40, electrons: [2, 8, 8], group: 18, period: 3, category: 'noble-gas', groupName: 'Noble Gases' },
  { number: 19, symbol: 'K', name: 'Potassium', mass: 39, electrons: [2, 8, 8, 1], group: 1, period: 4, category: 'alkali-metal', groupName: 'Alkali Metals' },
  { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40, electrons: [2, 8, 8, 2], group: 2, period: 4, category: 'alkaline-earth', groupName: 'Alkaline Earth Metals' },
];

export const groupColors: Record<string, string> = {
  'alkali-metal': '#f97316',
  'alkaline-earth': '#3b82f6',
  'halogen': '#ef4444',
  'noble-gas': '#a855f7',
  'nonmetal': '#22c55e',
  'metalloid': '#eab308',
  'transition': '#ec4899',
  'other': '#6b7280',
};

export const groupNames: Record<number, string> = {
  1: 'Alkali Metals',
  2: 'Alkaline Earth Metals',
  17: 'Halogens',
  18: 'Noble Gases',
};

export const groupOuterElectrons: Record<number, string> = {
  1: '1',
  2: '2',
  17: '7',
  18: 'Full shell (2 or 8)',
};

export function getElectronArrangement(el: Element): string {
  return el.electrons.join(',');
}

export function getOuterElectrons(el: Element): number {
  return el.electrons[el.electrons.length - 1];
}
