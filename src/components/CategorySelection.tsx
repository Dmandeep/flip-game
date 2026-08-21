import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import type { Category } from '../data/categories';
import { ChevronLeft } from 'lucide-react';

type Props = {
  onSelect: (category: Category) => void;
  onBack: () => void;
};

const ALL_CATEGORIES = categories;

export const CategorySelection: React.FC<Props> = ({ onSelect, onBack }) => {
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
            <span className="text-red-700 font-sans tracking-[0.3em] text-sm font-bold uppercase mb-1">Target Identification</span>
            <h2 className="text-5xl cinematic-title">
              Select Regiment
            </h2>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ALL_CATEGORIES.map((cat, i) => {
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelect(cat)}
                className="group relative flex flex-col items-center justify-center p-12 aot-panel hover:bg-white/5 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Worn edge effect */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                <div className="absolute inset-[4px] border border-black/50 pointer-events-none" />

                <span className="text-6xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity filter drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                  {cat.icon}
                </span>
                <span className="font-sans text-2xl tracking-widest text-[#d1d5db] group-hover:text-white transition-colors uppercase">
                  {cat.name}
                </span>
                <span className="font-sans text-xs text-red-700 font-bold uppercase tracking-widest mt-2">
                  {cat.id === 'mixed' ? 'Random Encounters' : `Class ${cat.items.length}`}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
