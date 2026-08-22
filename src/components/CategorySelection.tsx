import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import type { Category } from '../data/categories';
import { ChevronLeft } from 'lucide-react';
import { svgIconMap } from '../data/svgIcons';

type Props = {
  onSelect: (category: Category) => void;
  onBack: () => void;
};

const ALL_CATEGORIES = categories;

export const CategorySelection: React.FC<Props> = ({ onSelect, onBack }) => {
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
            <span className="text-red-700 font-sans tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-bold uppercase mb-1">Target Identification</span>
            <h2 className="text-3xl sm:text-5xl cinematic-title">
              Select Regiment
            </h2>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {ALL_CATEGORIES.map((cat, i) => {
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelect(cat)}
                className="group relative flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 aot-panel hover:bg-white/5 transition-colors duration-300 active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {/* Worn edge effect */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                <div className="absolute inset-[4px] border border-black/50 pointer-events-none" />

                {svgIconMap[cat.icon] ? (
                  <div className="w-10 h-10 sm:w-16 sm:h-16 mb-3 sm:mb-6 opacity-80 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    {svgIconMap[cat.icon]}
                  </div>
                ) : (
                  <span className="text-4xl sm:text-6xl mb-3 sm:mb-6 opacity-80 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    {cat.icon}
                  </span>
                )}
                <span className="font-sans text-sm sm:text-lg md:text-2xl tracking-wider sm:tracking-widest text-[#d1d5db] group-hover:text-white transition-colors uppercase text-center leading-tight">
                  {cat.name}
                </span>
                <span className="font-sans text-[10px] sm:text-xs text-red-700 font-bold uppercase tracking-widest mt-1 sm:mt-2">
                  {cat.items.length} Items
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
