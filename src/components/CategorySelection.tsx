import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { categories } from '../data/categories';
import type { Category } from '../data/categories';

type Props = {
  onSelect: (category: Category) => void;
  onBack: () => void;
};

export const CategorySelection: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <motion.div 
      className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full"
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
          <h2 className="text-3xl font-bold">Select Category</h2>
          <p className="text-slate-500 dark:text-slate-400">Choose a theme for your game</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(cat)}
            className="group relative flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className={`w-20 h-20 flex items-center justify-center text-4xl rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
