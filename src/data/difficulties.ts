export type DifficultyLevel = {
  id: string;
  name: string;
  rows: number;
  cols: number;
  color: string;
  multiplier: number;
  parTime: number;
};

export const difficulties: DifficultyLevel[] = [
  { id: 'easy', name: 'EASY', rows: 3, cols: 4, color: 'from-green-400 to-green-500', multiplier: 1, parTime: 40 },
  { id: 'medium', name: 'MEDIUM', rows: 4, cols: 4, color: 'from-yellow-400 to-yellow-500', multiplier: 1.5, parTime: 65 },
  { id: 'hard', name: 'HARD', rows: 5, cols: 4, color: 'from-orange-400 to-orange-500', multiplier: 2, parTime: 95 },
  { id: 'expert', name: 'EXPERT', rows: 6, cols: 4, color: 'from-red-500 to-red-600', multiplier: 3, parTime: 130 }
];

export const getPairsCount = (rows: number, cols: number) => (rows * cols) / 2;
