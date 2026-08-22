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
    { id: 't3', name: 'Armin', icon: '🧠', image: '/characters/armin_arlelt.jpeg' },
    { id: 't4', name: 'Levi', icon: '🗡️', image: '/characters/t4.jpeg' },
    { id: 't5', name: 'Erwin', icon: '🐎', image: '/characters/erwin_smith.jpeg' },
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

const titanShifters = {
  id: 'shifters',
  name: 'Titan Shifters',
  description: 'The Nine Titans',
  icon: '⚡',
  color: 'from-yellow-500 to-red-700',
  items: [
    { id: 's1', name: 'Attack Titan', icon: '💪' },
    { id: 's2', name: 'Founding Titan', icon: '👑' },
    { id: 's3', name: 'Colossal Titan', icon: '🔥' },
    { id: 's4', name: 'Armored Titan', icon: '🛡️' },
    { id: 's5', name: 'Female Titan', icon: '💎' },
    { id: 's6', name: 'Beast Titan', icon: '🦧' },
    { id: 's7', name: 'Jaw Titan', icon: '🦎' },
    { id: 's8', name: 'Cart Titan', icon: '🐗' },
    { id: 's9', name: 'War Hammer', icon: '💎' },
    { id: 's10', name: 'Titan Shift', icon: '🔄' },
    { id: 's11', name: 'Lightning', icon: '⚡' },
    { id: 's12', name: 'Hardening', icon: '🌀' },
  ]
};

const locations = {
  id: 'locations',
  name: 'Locations',
  description: 'World of Paradis',
  icon: '🏰',
  color: 'from-blue-700 to-slate-900',
  items: [
    { id: 'loc1', name: 'Wall Maria', icon: '🏰' },
    { id: 'loc2', name: 'Wall Rose', icon: '🌹' },
    { id: 'loc3', name: 'Wall Sina', icon: '👑' },
    { id: 'loc4', name: 'Shiganshina', icon: '🚪' },
    { id: 'loc5', name: 'Trost District', icon: '🏛️' },
    { id: 'loc6', name: 'Stohess', icon: '⛪' },
    { id: 'loc7', name: 'Forest of Trees', icon: '🌲' },
    { id: 'loc8', name: 'The Ocean', icon: '🌊' },
    { id: 'loc9', name: 'Marley', icon: '🗼' },
    { id: 'loc10', name: 'Liberio', icon: '🏚️' },
    { id: 'loc11', name: 'Paths Realm', icon: '✨' },
    { id: 'loc12', name: 'Fort Salta', icon: '⛰️' },
  ]
};

const regiments = {
  id: 'regiments',
  name: 'Regiments',
  description: 'Military Divisions',
  icon: '🎖️',
  color: 'from-green-700 to-green-950',
  items: [
    { id: 'reg1', name: 'Survey Corps', icon: '🦅' },
    { id: 'reg2', name: 'Garrison', icon: '🌹' },
    { id: 'reg3', name: 'Military Police', icon: '🔒' },
    { id: 'reg4', name: 'Cadet Corps', icon: '🎖️' },
    { id: 'reg5', name: 'War Flag', icon: '🏳️' },
    { id: 'reg6', name: 'Battle Horn', icon: '📯' },
    { id: 'reg7', name: 'ODM Gear', icon: '⚙️' },
    { id: 'reg8', name: 'Formation', icon: '👥' },
    { id: 'reg9', name: 'Orders', icon: '📋' },
    { id: 'reg10', name: 'Memorial', icon: '🕯️' },
    { id: 'reg11', name: 'Base Camp', icon: '🎪' },
    { id: 'reg12', name: 'Helmet', icon: '🪖' },
  ]
};

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Regiments',
    description: 'Full Attack on Titan Lore',
    icon: '🦅',
    color: 'from-red-700 to-zinc-900',
    items: [...titans.items, ...arsenal.items, ...lore.items, ...rations.items, ...titanShifters.items, ...locations.items, ...regiments.items]
  },
  titans,
  arsenal,
  lore,
  rations,
  titanShifters,
  locations,
  regiments
];
