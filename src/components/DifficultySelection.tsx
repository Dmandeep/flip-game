import { motion } from 'framer-motion';
import { difficulties } from '../data/difficulties';
import type { DifficultyLevel } from '../data/difficulties';
import type { Category } from '../data/categories';
import { ChevronLeft } from 'lucide-react';

type Props = {
  category: Category;
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
};

export const DifficultySelection: React.FC<Props> = ({ category, onSelect, onBack }) => {

  return (
    <motion.div
      className="flex-1 w-full flex flex-col items-center p-3 sm:p-6 relative z-10 min-h-screen overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-5xl mt-6 sm:mt-12 pb-8">
        
        {/* Header */}
        <div className="flex items-center relative mb-8 sm:mb-16 border-b border-[#333] pb-4 sm:pb-6">
          <button
            onClick={onBack}
            className="mr-4 sm:mr-6 p-2 sm:p-3 aot-btn rounded-none flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <span className="text-red-700 font-sans tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-bold uppercase mb-1">{category.name} Operations</span>
            <h2 className="text-3xl sm:text-5xl cinematic-title">
              Threat Level
            </h2>
          </div>
        </div>

        {/* Difficulties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {difficulties.map((diff: DifficultyLevel, i: number) => {
            const pairCount = (diff.cols * diff.rows) / 2;

            return (
              <motion.button
                key={diff.id}
                onClick={() => onSelect(diff)}
                className="group relative flex flex-col items-start p-5 sm:p-8 aot-panel hover:bg-white/5 transition-colors duration-300 text-left active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                <div className="absolute inset-[4px] border border-black/50 pointer-events-none" />

                <div className="text-xl sm:text-3xl font-sans tracking-widest text-[#d1d5db] group-hover:text-white uppercase mb-4 sm:mb-8">
                  {diff.name}
                </div>
                
                <div className="flex flex-col gap-2 sm:gap-3 w-full mt-auto font-sans tracking-wider text-xs sm:text-sm text-[#999]">
                  <div className="flex justify-between items-center border-b border-[#333] pb-1 sm:pb-2">
                    <span>Targets</span>
                    <span className="text-white font-bold">{pairCount}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#333] pb-1 sm:pb-2">
                    <span>Zone</span>
                    <span className="text-white font-bold">{diff.cols}×{diff.rows}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#333] pb-1 sm:pb-2 text-[#a3e635]">
                    <span>Score Multiplier</span>
                    <span className="font-bold">{diff.multiplier}x</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 sm:pb-2 text-[#60a5fa]">
                    <span>Par Time</span>
                    <span className="font-bold">{diff.parTime}s</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
