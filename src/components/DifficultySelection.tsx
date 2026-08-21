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
      className="flex-1 w-full flex flex-col items-center p-6 relative z-10 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-5xl mt-12">
        
        {/* Header */}
        <div className="flex items-center relative mb-16 border-b border-[#333] pb-6">
          <button
            onClick={onBack}
            className="mr-6 p-3 aot-btn rounded-none flex items-center justify-center w-12 h-12"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col">
            <span className="text-red-700 font-sans tracking-[0.3em] text-sm font-bold uppercase mb-1">{category.name} Operations</span>
            <h2 className="text-5xl cinematic-title">
              Threat Level
            </h2>
          </div>
        </div>

        {/* Difficulties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {difficulties.map((diff: DifficultyLevel, i: number) => {
            const pairCount = (diff.cols * diff.rows) / 2;

            return (
              <motion.button
                key={diff.id}
                onClick={() => onSelect(diff)}
                className="group relative flex flex-col items-start p-8 aot-panel hover:bg-white/5 transition-colors duration-300 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                <div className="absolute inset-[4px] border border-black/50 pointer-events-none" />

                <div className="text-3xl font-sans tracking-widest text-[#d1d5db] group-hover:text-white uppercase mb-8">
                  {diff.name}
                </div>
                
                <div className="flex flex-col gap-3 w-full mt-auto font-sans tracking-wider text-sm text-[#999]">
                  <div className="flex justify-between items-center border-b border-[#333] pb-2">
                    <span>Targets</span>
                    <span className="text-white font-bold">{pairCount}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#333] pb-2">
                    <span>Zone Size</span>
                    <span className="text-white font-bold">{diff.cols}×{diff.rows}</span>
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
