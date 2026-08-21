import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, Music, MonitorPlay, Trash2, Clock, Trophy, PlayCircle, Zap } from 'lucide-react';
import type { GameSettings } from '../utils/storage';
import { StorageUtils } from '../utils/storage';

type Props = {
  settings: GameSettings;
  onUpdate: (s: GameSettings) => void;
  onBack: () => void;
};

const Toggle = ({ label, icon, enabled, onToggle }: { label: string; icon: React.ReactNode; enabled: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between p-5 border-b border-[#333] hover:bg-white/5 transition-colors"
  >
    <div className="flex items-center gap-4 text-[#d1d5db] font-sans tracking-widest font-bold text-lg uppercase">
      {icon}
      {label}
    </div>
    <div className={`flex items-center p-1 w-14 h-6 border border-[#555] relative ${enabled ? 'bg-[#166534]' : 'bg-[#111]'}`}>
      <motion.div 
        className="w-4 h-4 bg-white"
        animate={{ x: enabled ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  </button>
);

export const SettingsScreen: React.FC<Props> = ({ settings, onUpdate, onBack }) => {
  const stats = StorageUtils.getStats();

  const toggle = (key: keyof GameSettings) => {
    onUpdate({ ...settings, [key]: !settings[key] });
  };

  const formatTime = (s: number) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <motion.div
      className="flex-1 w-full flex flex-col items-center min-h-screen overflow-y-auto p-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl py-12">
        
        <div className="flex items-center relative mb-16 border-b border-[#333] pb-6">
          <button
            onClick={onBack}
            className="mr-6 p-3 aot-btn rounded-none flex items-center justify-center w-12 h-12"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col">
            <span className="text-red-700 font-sans tracking-[0.3em] text-sm font-bold uppercase mb-1">System Preferences</span>
            <h2 className="text-5xl cinematic-title">
              Configuration
            </h2>
          </div>
        </div>

        <div className="mb-12">
          <div className="aot-panel border border-[#444] p-2">
            <Toggle label="Audio Output" icon={<Volume2 size={20} />} enabled={settings.soundOn} onToggle={() => toggle('soundOn')} />
            <Toggle label="BGM Track" icon={<Music size={20} />} enabled={settings.musicOn} onToggle={() => toggle('musicOn')} />
            <Toggle label="Tactical Motion" icon={<MonitorPlay size={20} />} enabled={settings.reducedMotion} onToggle={() => toggle('reducedMotion')} />
          </div>
        </div>

        <div className="mb-12 aot-panel border border-[#444] p-8">
          <h3 className="font-sans text-sm tracking-[0.3em] text-[#999] uppercase mb-6 text-center font-bold">Service Record</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-black/40 border border-[#333] p-4 text-center">
              <PlayCircle className="mx-auto mb-3 text-[#777]" size={20} />
              <div className="font-serif text-2xl font-bold text-white">{stats.totalMatches}</div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#777] uppercase mt-1">Deployments</div>
            </div>
            <div className="bg-black/40 border border-[#333] p-4 text-center">
              <Clock className="mx-auto mb-3 text-[#777]" size={20} />
              <div className="font-serif text-2xl font-bold text-white">{formatTime(stats.bestTime)}</div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#777] uppercase mt-1">Best Time</div>
            </div>
            <div className="bg-black/40 border border-[#333] p-4 text-center">
              <Trophy className="mx-auto mb-3 text-[#777]" size={20} />
              <div className="font-serif text-2xl font-bold text-white">{stats.bestScore}</div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#777] uppercase mt-1">Top Score</div>
            </div>
            <div className="bg-black/40 border border-[#333] p-4 text-center">
              <Zap className="mx-auto mb-3 text-[#777]" size={20} />
              <div className="font-serif text-2xl font-bold text-white">x{stats.bestCombo}</div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#777] uppercase mt-1">Max Combo</div>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => {
              if (window.confirm('Wipe all service records? This cannot be undone.')) {
                StorageUtils.saveStats({
                  gamesPlayed: 0,
                  gamesWon: 0,
                  bestScore: 0,
                  bestTime: 0,
                  bestCombo: 0,
                  totalMatches: 0,
                  totalMoves: 0,
                });
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 aot-btn aot-btn-danger border-2 border-[#7f1d1d]"
          >
            <Trash2 size={20} />
            Erase Records
          </button>
        </div>

      </div>
    </motion.div>
  );
};
