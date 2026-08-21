export type CategoryItem = {
  id: string;
  name: string;
  icon: string;
  image?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  items: CategoryItem[];
};

const titans = {
  id: 'titans',
  name: 'Characters',
  description: 'Scouts & Warriors',
  icon: '💀',
  color: 'from-red-600 to-orange-800',
  items: [
    { id: 't1', name: 'Eren', icon: '💀', image: '/characters/t1.png' },
    { id: 't2', name: 'Mikasa', icon: '⚔️', image: '/characters/t2.jpg' },
    { id: 't3', name: 'Armin', icon: '🧠', image: '/characters/t3.jpg' },
    { id: 't4', name: 'Levi', icon: '🗡️', image: '/characters/t4.jpeg' },
    { id: 't5', name: 'Erwin', icon: '🐎', image: '/characters/t5.jpg' },
    { id: 't6', name: 'Hange', icon: '👓', image: '/characters/t6.webp' },
    { id: 't7', name: 'Reiner', icon: '🛡️', image: '/characters/t7.webp' },
    { id: 't8', name: 'Bertholdt', icon: '🔥', image: '/characters/t8.jpeg' },
    { id: 't9', name: 'Zeke', icon: '🦧', image: '/characters/t9.webp' },
    { id: 't10', name: 'Annie', icon: '👱‍♀️', image: '/characters/t10.jpg' },
    { id: 't11', name: 'Jean', icon: '🐴', image: '/characters/t11.webp' },
    { id: 't12', name: 'Sasha', icon: '🥔', image: '/characters/t12.jpeg' },
  ]
};

const arsenal = {
  id: 'arsenal',
  name: 'Arsenal',
  description: 'Survey Corps Equipment',
  icon: '⚔️',
  color: 'from-zinc-500 to-zinc-800',
  items: [
    { id: 'a1', name: 'ODM Blade', icon: '⚔️' },
    { id: 'a2', name: 'Grapple Hook', icon: '⚓' },
    { id: 'a3', name: 'Thunder Spear', icon: '💣' },
    { id: 'a4', name: 'Scout Horse', icon: '🐎' },
    { id: 'a5', name: 'Flare Gun', icon: '🔫' },
    { id: 'a6', name: 'Gas Cylinder', icon: '💨' },
    { id: 'a7', name: 'Explosives', icon: '🧨' },
    { id: 'a8', name: 'Cannon', icon: '💣' },
    { id: 'a9', name: 'Rifle', icon: '🎯' },
    { id: 'a10', name: 'Anti-Titan Art.', icon: '🚂' },
    { id: 'a11', name: 'Binoculars', icon: '🔭' },
    { id: 'a12', name: 'Map', icon: '🗺️' },
  ]
};

const lore = {
  id: 'lore',
  name: 'Lore & Symbols',
  description: 'Relics of the World',
  icon: '🗝️',
  color: 'from-emerald-600 to-emerald-900',
  items: [
    { id: 'l1', name: 'Basement Key', icon: '🗝️' },
    { id: 'l2', name: 'Mikasa Scarf', icon: '🧣' },
    { id: 'l3', name: 'Titan Serum', icon: '💉' },
    { id: 'l4', name: 'Scout Cloak', icon: '🧥' },
    { id: 'l5', name: 'Ocean Shell', icon: '🐚' },
    { id: 'l6', name: 'Secret Docs', icon: '📜' },
    { id: 'l7', name: 'Levi Tea', icon: '☕' },
    { id: 'l8', name: 'Ymir Subject', icon: '⭐' },
    { id: 'l9', name: 'Coordinate', icon: '✨' },
    { id: 'l10', name: 'Path Tree', icon: '🌳' },
    { id: 'l11', name: 'Eren Journal', icon: '📖' },
    { id: 'l12', name: 'Wings of Freedom', icon: '🦅' },
  ]
};

const rations = {
  id: 'rations',
  name: 'Rations',
  description: 'Survival Supplies',
  icon: '🥔',
  color: 'from-amber-600 to-amber-900',
  items: [
    { id: 'r1', name: 'Steamed Potato', icon: '🥔' },
    { id: 'r2', name: 'Hard Bread', icon: '🍞' },
    { id: 'r3', name: 'Stolen Meat', icon: '🥩' },
    { id: 'r4', name: 'Zeke Wine', icon: '🍷' },
    { id: 'r5', name: 'Black Tea', icon: '🍵' },
    { id: 'r6', name: 'Stew', icon: '🍲' },
    { id: 'r7', name: 'Carrot', icon: '🥕' },
    { id: 'r8', name: 'Apple', icon: '🍎' },
    { id: 'r9', name: 'Canteen', icon: '💧' },
    { id: 'r10', name: 'Dry Biscuits', icon: '🍘' },
    { id: 'r11', name: 'Field Rations', icon: '🍱' },
    { id: 'r12', name: 'Niccolo Dish', icon: '🍝' },
  ]
};

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Regiments',
    description: 'Full Attack on Titan Lore',
    icon: '🦅',
    color: 'from-red-700 to-zinc-900',
    items: [...titans.items, ...arsenal.items, ...lore.items, ...rations.items]
  },
  titans,
  arsenal,
  lore,
  rations
];
