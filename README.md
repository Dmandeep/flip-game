# 🃏 Memory Flip

A beautiful anime-themed memory card-matching game built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## ✨ Features

- 🎴 **Card matching gameplay** — flip cards to find matching pairs
- 🎯 **4 difficulty levels** — Easy (4×4), Medium (5×4), Hard (6×6), Expert (8×6)
- 🗂️ **4 categories** — Fruits, Animals, Vehicles, Food (+ Mixed)
- 🔥 **Combo scoring** — chain matches to multiply your score
- ⏱️ **Timer** — race against the clock
- 📊 **Progress bar** — track pairs found vs total
- 🔊 **Sound effects** — synthesized with the Web Audio API (no external files)
- 💾 **Persistent stats** — best score, best time, best combo saved to localStorage
- 🌙 **Dark / Light / System theme** support
- ♿ **Reduced motion** accessibility option
- 📱 **Fully responsive** — works on mobile and desktop

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript 6 | Type safety |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Web Audio API | Synthesized sound effects |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Start Game** → choose a category → choose difficulty
2. Click cards to **flip** them
3. Find **matching pairs** — matching cards are removed from the board
4. Chain matches for a **combo multiplier** on your score
5. **Win** when all pairs are found!

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── Card.tsx         # Individual card with 3D flip animation
│   ├── CategorySelection.tsx
│   ├── DifficultySelection.tsx
│   ├── GameScreen.tsx   # Main gameplay screen
│   ├── HomeScreen.tsx
│   ├── ResultsScreen.tsx
│   └── SettingsScreen.tsx
├── data/
│   ├── categories.ts    # Category & item definitions
│   └── difficulties.ts  # Grid size configs
├── utils/
│   ├── shuffle.ts       # Fisher-Yates shuffle
│   ├── sound.ts         # Web Audio API sound effects
│   └── storage.ts       # localStorage helpers
└── App.tsx              # Screen state machine
```
