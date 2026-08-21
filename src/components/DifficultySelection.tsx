import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { difficulties } from '../data/difficulties';
import type { DifficultyLevel } from '../data/difficulties';
import type { Category } from '../data/categories';

type Props = {
  category: Category;
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
};

export const DifficultySelection: React.FC<Props> = ({ category, onSelect, onBack }) => {
  return (
    <motion.div 
      className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full"
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
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span> 
            Select Difficulty
          </h2>
          <p className="text-slate-500 dark:text-slate-400">How good is your memory?</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {difficulties.map((diff, index) => (
          <motion.button
            key={diff.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(diff)}
            className="group flex flex-col p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden text-left"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${diff.color}`} />
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${diff.color} opacity-5 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />
            
            <div className="pl-4">
              <h3 className="text-2xl font-black mb-1">{diff.name}</h3>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-4 font-medium">
                <span>{diff.cols} × {diff.rows} Grid</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>{(diff.cols * diff.rows) / 2} Pairs</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
