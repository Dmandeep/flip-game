import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Monitor, Moon, Sun, Accessibility } from 'lucide-react';
import { StorageUtils } from '../utils/storage';
import type { GameSettings } from '../utils/storage';

type Props = {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onBack: () => void;
};

export const SettingsScreen: React.FC<Props> = ({ settings, onSave, onBack }) => {
  const stats = StorageUtils.getStats();

  const toggleSetting = (key: keyof GameSettings) => {
    onSave({ ...settings, [key]: !settings[key] });
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    onSave({ ...settings, theme });
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col p-6 max-w-3xl mx-auto w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <header className="flex items-center mb-8 mt-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors mr-4"
        >
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-3xl font-bold">Settings & Stats</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.soundOn ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} className="text-slate-400" />}
                  <span className="font-medium">Sound Effects</span>
                </div>
                <button 
                  onClick={() => toggleSetting('soundOn')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.soundOn ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.soundOn ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Accessibility size={20} className={settings.reducedMotion ? "text-primary" : "text-slate-400"} />
                  <span className="font-medium">Reduced Motion</span>
                </div>
                <button 
                  onClick={() => toggleSetting('reducedMotion')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.reducedMotion ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.reducedMotion ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <h4 className="font-bold mt-6 mb-3 text-slate-800 dark:text-white">Theme</h4>
            <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${settings.theme === 'light' ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <Sun size={16} /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${settings.theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <Moon size={16} /> Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${settings.theme === 'system' ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <Monitor size={16} /> System
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Your Stats</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase">Games Played</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.gamesPlayed}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase">Games Won</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.gamesWon}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase">Best Score</p>
              <p className="text-2xl font-black text-yellow-500">{stats.bestScore}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase">Best Combo</p>
              <p className="text-2xl font-black text-orange-500">×{stats.bestCombo}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
