export interface TopicDef {
  id: string;
  title: string;
  emoji: string;
  colour: string;
  gradient: string;
  shortDesc: string;
}

export const topics: TopicDef[] = [
  {
    id: 'electron-arrangement',
    title: 'Electron Arrangement',
    emoji: '\u269B\uFE0F',
    colour: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
    shortDesc: 'Shells, groups & the periodic table',
  },
  {
    id: 'ions-and-formulas',
    title: 'Ions & Formulas',
    emoji: '\u26A1',
    colour: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    shortDesc: 'Ion formation & writing chemical formulas',
  },
  {
    id: 'balancing-equations',
    title: 'Balancing Equations',
    emoji: '\u2696\uFE0F',
    colour: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    shortDesc: 'Making both sides equal',
  },
  {
    id: 'acids-and-bases',
    title: 'Acids & Bases',
    emoji: '\uD83E\uDDEA',
    colour: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    shortDesc: 'H\u207A ions, OH\u207B ions & properties',
  },
  {
    id: 'indicators',
    title: 'Indicators',
    emoji: '\uD83C\uDF08',
    colour: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    shortDesc: 'pH scale, litmus & universal indicator',
  },
  {
    id: 'neutralisation',
    title: 'Neutralisation',
    emoji: '\uD83E\uDDEC',
    colour: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    shortDesc: 'Acid + Base \u2192 Salt + Water',
  },
];

export function getTopicById(id: string): TopicDef | undefined {
  return topics.find(t => t.id === id);
}
