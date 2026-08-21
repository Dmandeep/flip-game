import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { categories } from '../data/categories';
import type { Category } from '../data/categories';

type Props = {
  onSelect: (category: Category) => void;
  onBack: () => void;
};

const categoryGradients: Record<string, string> = {
  all:      'from-fuchsia-500 to-cyan-500',
  fruits:   'from-rose-500 to-orange-500',
  animals:  'from-emerald-500 to-teal-500',
  vehicles: 'from-blue-500 to-indigo-600',
  food:     'from-amber-500 to-orange-600',
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
  exit:   { opacity: 0, y: -12, scale: 0.94, transition: { duration: 0.18 } },
};

export const CategorySelection: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full relative z-10"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.28 }}
    >
      <header className="flex items-center mb-8 mt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.12, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-purple-200"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <div>
          <h2 className="text-3xl font-bold text-white">Select Category</h2>
          <p className="text-purple-300/70">Choose a theme for your game</p>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {categories.map(cat => {
          const grad = categoryGradients[cat.id] || cat.color;
          return (
            <motion.button
              key={cat.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(cat)}
              className={`group relative flex flex-col items-center text-center p-8 bg-gradient-to-br ${grad} rounded-3xl shadow-lg border border-white/20 overflow-hidden transition-shadow duration-300`}
            >
              {/* Hover sheen */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl" />
              {/* Icon */}
              <motion.div
                className="text-6xl mb-4 drop-shadow-lg z-10"
                whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.15 }}
                transition={{ duration: 0.4 }}
              >
                {cat.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-1 text-white z-10">{cat.name}</h3>
              <p className="text-sm text-white/70 z-10">{cat.description}</p>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
