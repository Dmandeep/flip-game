export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  bestScore: number;
  bestTime: number; // in seconds
  bestCombo: number;
  totalMatches: number;
  totalMoves: number;
};

export type GameSettings = {
  soundOn: boolean;
  musicOn: boolean;
  reducedMotion: boolean;
  theme: 'light' | 'dark' | 'system';
};

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  bestScore: 0,
  bestTime: 999999,
  bestCombo: 0,
  totalMatches: 0,
  totalMoves: 0,
};

const DEFAULT_SETTINGS: GameSettings = {
  soundOn: true,
  musicOn: false,
  reducedMotion: false,
  theme: 'system',
};

export const StorageUtils = {
  getStats: (): GameStats => {
    const stats = localStorage.getItem('memoryFlipStats');
    return stats ? { ...DEFAULT_STATS, ...JSON.parse(stats) } : DEFAULT_STATS;
  },
  saveStats: (stats: GameStats) => {
    localStorage.setItem('memoryFlipStats', JSON.stringify(stats));
  },
  updateStats: (updates: Partial<GameStats>) => {
    const current = StorageUtils.getStats();
    StorageUtils.saveStats({ ...current, ...updates });
  },
  getSettings: (): GameSettings => {
    const settings = localStorage.getItem('memoryFlipSettings');
    return settings ? { ...DEFAULT_SETTINGS, ...JSON.parse(settings) } : DEFAULT_SETTINGS;
  },
  saveSettings: (settings: GameSettings) => {
    localStorage.setItem('memoryFlipSettings', JSON.stringify(settings));
  },
};
