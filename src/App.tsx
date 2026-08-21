import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelection } from './components/CategorySelection';
import { DifficultySelection } from './components/DifficultySelection';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import type { Category } from './data/categories';
import type { DifficultyLevel } from './data/difficulties';
import { StorageUtils } from './utils/storage';
import type { GameSettings } from './utils/storage';
import { AnimatePresence } from 'framer-motion';

export type ScreenState = 'home' | 'categories' | 'difficulty' | 'game' | 'results' | 'settings';

export type GameResult = {
  time: number;
  moves: number;
  score: number;
  combo: number;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [settings, setSettings] = useState<GameSettings>(StorageUtils.getSettings());

  /* ── Theme sync ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  }, [settings.theme]);

  const navigateTo = (screen: ScreenState) => setCurrentScreen(screen);

  const saveSettings = (s: GameSettings) => {
    setSettings(s);
    StorageUtils.saveSettings(s);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col relative transition-colors duration-300">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <HomeScreen
            key="home"
            onPlay={() => navigateTo('categories')}
            onSettings={() => navigateTo('settings')}
          />
        )}

        {currentScreen === 'categories' && (
          <CategorySelection
            key="categories"
            onSelect={cat => { setSelectedCategory(cat); navigateTo('difficulty'); }}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'difficulty' && (
          <DifficultySelection
            key="difficulty"
            category={selectedCategory!}
            onSelect={diff => { setSelectedDifficulty(diff); navigateTo('game'); }}
            onBack={() => navigateTo('categories')}
          />
        )}

        {currentScreen === 'game' && (
          <GameScreen
            key="game"
            category={selectedCategory!}
            difficulty={selectedDifficulty!}
            settings={settings}
            onWin={result => { setGameResult(result); navigateTo('results'); }}
            onQuit={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            key="results"
            result={gameResult!}
            onPlayAgain={() => navigateTo('game')}
            onChangeCategory={() => navigateTo('categories')}
            onChangeDifficulty={() => navigateTo('difficulty')}
            onHome={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            key="settings"
            settings={settings}
            onSave={saveSettings}
            onBack={() => navigateTo('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
