import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Monitor, Moon, Sun, Accessibility, Music } from 'lucide-react';
import { StorageUtils } from '../utils/storage';
import type { GameSettings } from '../utils/storage';

type Props = {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onBack: () => void;
};

/* ── Animated toggle switch ───────────────────────────────────────────────── */
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 ${
        on ? 'bg-fuchsia-500' : 'bg-purple-800'
      }`}
      aria-checked={on}
      role="switch"
    >
      <motion.div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        animate={{ left: on ? '1.75rem' : '0.25rem' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ── Stat tile ────────────────────────────────────────────────────────────── */
function StatTile({
  label, value, grad, border, valueClass, delay = 0,
}: {
  label: string; value: string | number; grad: string; border: string; valueClass: string; delay?: number;
}) {
  return (
    <motion.div
      className={`bg-slate-800/50 p-4 rounded-2xl border ${border}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
    >
      <p className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-widest">{label}</p>
      <p className={`text-2xl font-black ${valueClass}`}>{value}</p>
    </motion.div>
  );
}

export const SettingsScreen: React.FC<Props> = ({ settings, onSave, onBack }) => {
  const stats = StorageUtils.getStats();

  const toggle = (key: keyof GameSettings) =>
    onSave({ ...settings, [key]: !settings[key] });

  const setTheme = (theme: 'light' | 'dark' | 'system') =>
    onSave({ ...settings, theme });

  const bestTimeStr =
    stats.bestTime >= 999999
      ? '—'
      : `${Math.floor(stats.bestTime / 60).toString().padStart(2, '0')}:${(stats.bestTime % 60).toString().padStart(2, '0')}`;

  return (
    <motion.div
      className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full relative z-10 overflow-y-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <header className="flex items-center mb-10 mt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.15, x: -4 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors mr-5 text-white shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Settings &amp; Stats</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Preferences panel ──────────────────────────────────── */}
        <motion.div
          className="bg-slate-900/60 backdrop-blur-md rounded-[1.5rem] p-6 shadow-xl border border-white/10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-xl font-black text-white tracking-wide">Preferences</h3>

          {/* Toggles */}
          <div className="space-y-4">
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-200">
                <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                  {settings.soundOn
                    ? <Volume2 size={16} className="text-white" />
                    : <VolumeX size={16} className="text-slate-500" />}
                </div>
                <span className="font-semibold text-sm md:text-base">Sound Effects</span>
              </div>
              <Toggle on={settings.soundOn} onClick={() => toggle('soundOn')} />
            </div>

            {/* Music */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-200">
                <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                  <Music size={16} className={settings.musicOn ? 'text-white' : 'text-slate-500'} />
                </div>
                <span className="font-semibold text-sm md:text-base">Background Music</span>
              </div>
              <Toggle on={settings.musicOn} onClick={() => toggle('musicOn')} />
            </div>

            {/* Reduced motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-200">
                <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                  <Accessibility size={16} className={settings.reducedMotion ? 'text-white' : 'text-slate-500'} />
                </div>
                <span className="font-semibold text-sm md:text-base">Reduced Motion</span>
              </div>
              <Toggle on={settings.reducedMotion} onClick={() => toggle('reducedMotion')} />
            </div>
          </div>

          {/* Theme picker */}
          <div>
            <h4 className="font-bold mb-3 text-white text-base">Theme</h4>
            <div className="flex gap-2 bg-slate-950/50 p-1.5 rounded-xl border border-white/5">
              {(['light', 'dark', 'system'] as const).map(t => {
                const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Monitor;
                const label = t.charAt(0).toUpperCase() + t.slice(1);
                return (
                  <motion.button
                    key={t}
                    onClick={() => setTheme(t)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                      settings.theme === t
                        ? 'bg-white text-slate-900 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} /> {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Stats panel ────────────────────────────────────────── */}
        <motion.div
          className="bg-slate-900/60 backdrop-blur-md rounded-[1.5rem] p-6 shadow-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-black mb-5 text-white tracking-wide">Your Stats</h3>

          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Games Played" value={stats.gamesPlayed} grad="from-rose-500/20 to-pink-600/20"    border="border-rose-500/20"    valueClass="text-white"       delay={0.12} />
            <StatTile label="Games Won"    value={stats.gamesWon}    grad="from-emerald-500/20 to-teal-600/20" border="border-emerald-500/20" valueClass="text-emerald-200" delay={0.16} />
            <StatTile label="Best Score"   value={stats.bestScore}   grad="from-amber-500/20 to-yellow-600/20" border="border-amber-500/20"   valueClass="text-yellow-300"  delay={0.20} />
            <StatTile label="Best Combo"   value={`×${stats.bestCombo}`} grad="from-orange-500/20 to-red-600/20"  border="border-orange-500/20"  valueClass="text-orange-300"  delay={0.24} />
            <motion.div
              className="col-span-2 bg-slate-800/50 p-4 rounded-xl border border-sky-500/20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <p className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">Best Time</p>
              <p className="text-2xl font-black text-sky-300">{bestTimeStr}</p>
            </motion.div>
          </div>

          {stats.gamesPlayed > 0 && (
            <motion.button
              onClick={() => {
                StorageUtils.updateStats({
                  gamesPlayed: 0, gamesWon: 0, bestScore: 0, bestTime: 999999,
                  bestCombo: 0, totalMatches: 0, totalMoves: 0,
                });
                window.location.reload();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-5 w-full py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold rounded-xl transition-colors text-xs border border-transparent hover:border-red-500/20"
            >
              🗑 Reset All Stats
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
