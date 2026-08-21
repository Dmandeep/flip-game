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
      className={`bg-gradient-to-br ${grad} p-4 rounded-2xl border ${border}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 24 }}
    >
      <p className="text-purple-300 text-[10px] font-black mb-1 uppercase tracking-widest">{label}</p>
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
      className="flex-1 flex flex-col p-6 max-w-3xl mx-auto w-full relative z-10 overflow-y-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.28 }}
    >
      {/* Header */}
      <header className="flex items-center mb-8 mt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.12, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-purple-200"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <h2 className="text-3xl font-bold text-white">Settings &amp; Stats</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Preferences panel ──────────────────────────────────── */}
        <motion.div
          className="bg-purple-900/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-purple-500/20 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-xl font-bold text-white">Preferences</h3>

          {/* Toggles */}
          <div className="space-y-4">
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-purple-200">
                {settings.soundOn
                  ? <Volume2 size={20} className="text-fuchsia-400" />
                  : <VolumeX size={20} className="text-purple-400" />}
                <span className="font-medium">Sound Effects</span>
              </div>
              <Toggle on={settings.soundOn} onClick={() => toggle('soundOn')} />
            </div>

            {/* Music */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-purple-200">
                <Music size={20} className={settings.musicOn ? 'text-fuchsia-400' : 'text-purple-400'} />
                <span className="font-medium">Background Music</span>
              </div>
              <Toggle on={settings.musicOn} onClick={() => toggle('musicOn')} />
            </div>

            {/* Reduced motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-purple-200">
                <Accessibility size={20} className={settings.reducedMotion ? 'text-fuchsia-400' : 'text-purple-400'} />
                <span className="font-medium">Reduced Motion</span>
              </div>
              <Toggle on={settings.reducedMotion} onClick={() => toggle('reducedMotion')} />
            </div>
          </div>

          {/* Theme picker */}
          <div>
            <h4 className="font-bold mb-3 text-white">Theme</h4>
            <div className="flex gap-2 bg-purple-950/50 p-1 rounded-xl">
              {(['light', 'dark', 'system'] as const).map(t => {
                const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Monitor;
                const label = t.charAt(0).toUpperCase() + t.slice(1);
                return (
                  <motion.button
                    key={t}
                    onClick={() => setTheme(t)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      settings.theme === t
                        ? 'bg-fuchsia-500 text-white shadow-md'
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    <Icon size={15} /> {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Stats panel ────────────────────────────────────────── */}
        <motion.div
          className="bg-purple-900/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold mb-5 text-white">Your Stats</h3>

          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Games Played" value={stats.gamesPlayed} grad="from-rose-500/20 to-pink-600/20"    border="border-rose-500/20"    valueClass="text-white"       delay={0.12} />
            <StatTile label="Games Won"    value={stats.gamesWon}    grad="from-emerald-500/20 to-teal-600/20" border="border-emerald-500/20" valueClass="text-emerald-200" delay={0.16} />
            <StatTile label="Best Score"   value={stats.bestScore}   grad="from-amber-500/20 to-yellow-600/20" border="border-amber-500/20"   valueClass="text-yellow-300"  delay={0.20} />
            <StatTile label="Best Combo"   value={`×${stats.bestCombo}`} grad="from-orange-500/20 to-red-600/20"  border="border-orange-500/20"  valueClass="text-orange-300"  delay={0.24} />
            <motion.div
              className="col-span-2 bg-gradient-to-br from-sky-500/20 to-blue-600/20 p-4 rounded-2xl border border-sky-500/20"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <p className="text-purple-300 text-[10px] font-black mb-1 uppercase tracking-widest">Best Time</p>
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
              className="mt-4 w-full py-2 text-red-400 hover:bg-red-500/10 font-semibold rounded-xl transition-colors text-sm"
            >
              🗑 Reset Stats
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
