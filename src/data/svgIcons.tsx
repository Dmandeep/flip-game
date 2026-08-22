import React from 'react';

export const svgIconMap: Record<string, React.ReactNode> = {
  '💀': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='skull-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#eef2f3'/>
          <stop offset='100%' stopColor='#8e9eab'/>
        </linearGradient>
        <linearGradient id='eye-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#111'/>
          <stop offset='100%' stopColor='#333'/>
        </linearGradient>
      </defs>
      <path d='M32 6C18.7 6 8 16.7 8 30c0 7.8 3.7 14.8 9.5 19.3.5 3.5 1.5 6.7 2.5 6.7h24c1 0 2-3.2 2.5-6.7 5.8-4.5 9.5-11.5 9.5-19.3 0-13.3-10.7-24-24-24z' fill='url(#skull-grad)'/>
      <circle cx='20' cy='32' r='6' fill='url(#eye-grad)'/>
      <circle cx='44' cy='32' r='6' fill='url(#eye-grad)'/>
      <path d='M32 40l-2 5h4l-2-5z' fill='#111'/>
      <path d='M24 50v4m4-4v4m4-4v4m4-4v4m4-4v4' stroke='#333' strokeWidth='2'/>
    </svg>
  ),
  '⚔️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='sword-blade' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ece9e6'/>
          <stop offset='100%' stopColor='#ffffff'/>
        </linearGradient>
        <linearGradient id='sword-hilt' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffd700'/>
          <stop offset='100%' stopColor='#b8860b'/>
        </linearGradient>
      </defs>
      <g transform='rotate(45, 32, 32)'>
        <path d='M30 10L32 6L34 10V40H30V10Z' fill='url(#sword-blade)'/>
        <rect x='24' y='40' width='16' height='4' fill='url(#sword-hilt)'/>
        <rect x='30' y='44' width='4' height='12' fill='#555'/>
        <circle cx='32' cy='56' r='3' fill='url(#sword-hilt)'/>
      </g>
      <g transform='rotate(-45, 32, 32)'>
        <path d='M30 10L32 6L34 10V40H30V10Z' fill='url(#sword-blade)'/>
        <rect x='24' y='40' width='16' height='4' fill='url(#sword-hilt)'/>
        <rect x='30' y='44' width='4' height='12' fill='#555'/>
        <circle cx='32' cy='56' r='3' fill='url(#sword-hilt)'/>
      </g>
    </svg>
  ),
  '🧠': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='brain-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffb6c1'/>
          <stop offset='100%' stopColor='#db7093'/>
        </radialGradient>
      </defs>
      <path d='M32 10c-15 0-24 10-24 24 0 10 8 18 16 20 4 1 12 1 16 0 8-2 16-10 16-20 0-14-9-24-24-24z' fill='url(#brain-grad)'/>
      <path d='M20 20c4 4 12 4 16 0M16 30c6 4 14 4 20 0M20 40c4 4 12 4 16 0M32 12v44' stroke='#c71585' strokeWidth='2' strokeLinecap='round'/>
    </svg>
  ),
  '🗡️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='dagger-blade' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#b0bec5'/>
          <stop offset='100%' stopColor='#eceff1'/>
        </linearGradient>
      </defs>
      <path d='M28 8L32 4L36 8V36H28V8Z' fill='url(#dagger-blade)'/>
      <rect x='22' y='36' width='20' height='4' rx='2' fill='#8d6e63'/>
      <rect x='30' y='40' width='4' height='16' fill='#4e342e'/>
      <circle cx='32' cy='58' r='4' fill='#ffca28'/>
    </svg>
  ),
  '🐎': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='horse-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#4e342e'/>
        </linearGradient>
      </defs>
      <path d='M44 14C40 10 32 10 26 14L16 26c-2 2-2 6 0 8l4 4c2 2 6 2 8 0l4-4v14c0 4 6 4 8 0V28l12-10c2-2 2-6 0-8z' fill='url(#horse-grad)'/>
      <circle cx='24' cy='22' r='2' fill='#111'/>
      <path d='M44 14c4 4 4 12 0 16' stroke='#3e2723' strokeWidth='4' fill='none'/>
    </svg>
  ),
  '👓': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='glass-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#81d4fa' stopOpacity='0.6'/>
          <stop offset='100%' stopColor='#0288d1' stopOpacity='0.2'/>
        </linearGradient>
      </defs>
      <circle cx='20' cy='32' r='14' fill='url(#glass-grad)' stroke='#424242' strokeWidth='4'/>
      <circle cx='44' cy='32' r='14' fill='url(#glass-grad)' stroke='#424242' strokeWidth='4'/>
      <path d='M34 32h-4' stroke='#424242' strokeWidth='4'/>
      <path d='M6 32c-2 0-4-2-4-4V16m56 16c2 0 4-2 4-4V16' stroke='#424242' strokeWidth='4' fill='none'/>
    </svg>
  ),
  '🛡️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='shield-base' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#cfd8dc'/>
          <stop offset='100%' stopColor='#607d8b'/>
        </linearGradient>
        <linearGradient id='shield-rim' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#bcaaa4'/>
          <stop offset='100%' stopColor='#5d4037'/>
        </linearGradient>
      </defs>
      <path d='M32 4l24 8v16c0 18-12 30-24 32C20 58 8 46 8 28V12L32 4z' fill='url(#shield-base)' stroke='url(#shield-rim)' strokeWidth='4'/>
      <path d='M32 12v40M16 32h32' stroke='url(#shield-rim)' strokeWidth='4'/>
    </svg>
  ),
  '🔥': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='fire-grad' cx='0.5' cy='0.8' r='0.8'>
          <stop offset='0%' stopColor='#ffeb3b'/>
          <stop offset='40%' stopColor='#ff9800'/>
          <stop offset='100%' stopColor='#f44336'/>
        </radialGradient>
      </defs>
      <path d='M32 4C24 16 12 28 12 40c0 12 10 20 20 20s20-8 20-20c0-12-12-24-20-36z' fill='url(#fire-grad)'/>
      <path d='M32 20c-6 8-10 16-10 24 0 6 4 12 10 12s10-6 10-12c0-8-4-16-10-24z' fill='#ffeb3b'/>
    </svg>
  ),
  '🦧': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='ape-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#a1887f'/>
          <stop offset='100%' stopColor='#5d4037'/>
        </radialGradient>
      </defs>
      <circle cx='32' cy='32' r='24' fill='url(#ape-grad)'/>
      <circle cx='24' cy='28' r='4' fill='#212121'/>
      <circle cx='40' cy='28' r='4' fill='#212121'/>
      <path d='M24 44c4 4 12 4 16 0' stroke='#3e2723' strokeWidth='4' fill='none'/>
      <ellipse cx='32' cy='40' rx='12' ry='8' fill='#d7ccc8' opacity='0.5'/>
    </svg>
  ),
  '👱‍♀️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='blonde-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffe082'/>
          <stop offset='100%' stopColor='#ffb300'/>
        </linearGradient>
        <radialGradient id='face-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffccbc'/>
          <stop offset='100%' stopColor='#ffab91'/>
        </radialGradient>
      </defs>
      <path d='M16 28c0-16 8-24 16-24s16 8 16 24v20H16V28z' fill='url(#blonde-grad)'/>
      <circle cx='32' cy='36' r='14' fill='url(#face-grad)'/>
      <circle cx='28' cy='34' r='2' fill='#3e2723'/>
      <circle cx='36' cy='34' r='2' fill='#3e2723'/>
      <path d='M28 42c2 2 6 2 8 0' stroke='#d84315' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🐴': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='horse-face' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#a1887f'/>
          <stop offset='100%' stopColor='#6d4c41'/>
        </linearGradient>
      </defs>
      <path d='M20 12l-4-8 8 4c4-2 12-2 16 0l8-4-4 8c4 6 6 14 4 24l-4 16c-2 4-8 6-12 6s-10-2-12-6l-4-16c-2-10 0-18 4-24z' fill='url(#horse-face)'/>
      <ellipse cx='32' cy='48' rx='10' ry='6' fill='#d7ccc8'/>
      <circle cx='24' cy='28' r='3' fill='#212121'/>
      <circle cx='40' cy='28' r='3' fill='#212121'/>
      <circle cx='28' cy='48' r='2' fill='#4e342e'/>
      <circle cx='36' cy='48' r='2' fill='#4e342e'/>
    </svg>
  ),
  '🥔': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='potato-grad' cx='0.4' cy='0.4' r='0.6'>
          <stop offset='0%' stopColor='#ffcc80'/>
          <stop offset='100%' stopColor='#bcaaa4'/>
        </radialGradient>
      </defs>
      <path d='M32 12c-12 0-20 8-24 20s8 24 24 24 20-12 20-24-8-20-20-20z' fill='url(#potato-grad)'/>
      <circle cx='20' cy='24' r='2' fill='#8d6e63'/>
      <circle cx='40' cy='36' r='3' fill='#8d6e63'/>
      <circle cx='28' cy='44' r='1.5' fill='#8d6e63'/>
      <circle cx='36' cy='18' r='2' fill='#8d6e63'/>
    </svg>
  ),
  '⚓': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='anchor-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#90a4ae'/>
          <stop offset='100%' stopColor='#455a64'/>
        </linearGradient>
      </defs>
      <circle cx='32' cy='12' r='6' stroke='url(#anchor-grad)' strokeWidth='4'/>
      <path d='M32 18v34M24 28h16M16 40c0 8 8 16 16 16s16-8 16-16' stroke='url(#anchor-grad)' strokeWidth='4' fill='none'/>
      <path d='M12 36l4 4-4 4-4-4zM52 36l4 4-4 4-4-4z' fill='url(#anchor-grad)'/>
    </svg>
  ),
  '💣': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='bomb-grad' cx='0.3' cy='0.3' r='0.7'>
          <stop offset='0%' stopColor='#616161'/>
          <stop offset='100%' stopColor='#212121'/>
        </radialGradient>
      </defs>
      <circle cx='32' cy='36' r='20' fill='url(#bomb-grad)'/>
      <rect x='28' y='12' width='8' height='6' fill='#424242'/>
      <path d='M32 12s2-8 8-8 6 6 12 4' stroke='#ffb300' strokeWidth='2' fill='none'/>
      <circle cx='52' cy='8' r='2' fill='#f44336'/>
      <path d='M26 26c4-4 10-4 14 0' stroke='#9e9e9e' strokeWidth='2' fill='none' opacity='0.5'/>
    </svg>
  ),
  '🔫': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gun-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#78909c'/>
          <stop offset='100%' stopColor='#37474f'/>
        </linearGradient>
        <linearGradient id='grip-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#4e342e'/>
        </linearGradient>
      </defs>
      <path d='M12 24h32v8H12z' fill='url(#gun-grad)'/>
      <path d='M36 32h8v16c0 2-2 4-4 4h-4z' fill='url(#grip-grad)'/>
      <circle cx='28' cy='36' r='4' fill='none' stroke='url(#gun-grad)' strokeWidth='2'/>
      <path d='M26 36h4' stroke='#263238' strokeWidth='2'/>
      <rect x='44' y='24' width='4' height='6' fill='#263238'/>
    </svg>
  ),
  '💨': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='wind-grad' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#e0f7fa' stopOpacity='0'/>
          <stop offset='100%' stopColor='#4dd0e1'/>
        </linearGradient>
      </defs>
      <path d='M10 24h30c4 0 6-2 6-6s-2-6-6-6-6 2-6 6' stroke='url(#wind-grad)' strokeWidth='4' fill='none' strokeLinecap='round'/>
      <path d='M16 40h24c6 0 8 2 8 8s-2 8-8 8-8-2-8-8' stroke='url(#wind-grad)' strokeWidth='4' fill='none' strokeLinecap='round'/>
      <path d='M4 32h44c6 0 10-4 10-10s-4-10-10-10' stroke='url(#wind-grad)' strokeWidth='4' fill='none' strokeLinecap='round'/>
    </svg>
  ),
  '🧨': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='dynamite-grad' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#ef5350'/>
          <stop offset='50%' stopColor='#b71c1c'/>
          <stop offset='100%' stopColor='#ef5350'/>
        </linearGradient>
      </defs>
      <rect x='24' y='20' width='16' height='36' rx='2' fill='url(#dynamite-grad)'/>
      <rect x='24' y='28' width='16' height='4' fill='#212121'/>
      <rect x='24' y='44' width='16' height='4' fill='#212121'/>
      <path d='M32 20s-2-12 6-12' stroke='#ffeb3b' strokeWidth='2' fill='none'/>
      <circle cx='38' cy='8' r='3' fill='#ff9800'/>
    </svg>
  ),
  '🎯': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='target-red' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#f44336'/>
          <stop offset='100%' stopColor='#b71c1c'/>
        </radialGradient>
        <radialGradient id='target-white' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#bdbdbd'/>
        </radialGradient>
      </defs>
      <circle cx='32' cy='32' r='28' fill='url(#target-red)'/>
      <circle cx='32' cy='32' r='20' fill='url(#target-white)'/>
      <circle cx='32' cy='32' r='12' fill='url(#target-red)'/>
      <circle cx='32' cy='32' r='4' fill='#ffeb3b'/>
      <path d='M32 32l16-16' stroke='#212121' strokeWidth='2'/>
      <path d='M48 16l4-4' stroke='#757575' strokeWidth='4'/>
    </svg>
  ),
  '🚂': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='train-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#546e7a'/>
          <stop offset='100%' stopColor='#263238'/>
        </linearGradient>
        <linearGradient id='wheel-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#757575'/>
          <stop offset='100%' stopColor='#212121'/>
        </linearGradient>
      </defs>
      <rect x='12' y='24' width='40' height='24' rx='4' fill='url(#train-grad)'/>
      <rect x='36' y='12' width='12' height='12' fill='url(#train-grad)'/>
      <rect x='16' y='16' width='6' height='8' fill='#90a4ae'/>
      <circle cx='20' cy='48' r='6' fill='url(#wheel-grad)'/>
      <circle cx='34' cy='48' r='6' fill='url(#wheel-grad)'/>
      <circle cx='48' cy='48' r='6' fill='url(#wheel-grad)'/>
      <path d='M16 24h32v4H16z' fill='#f44336'/>
    </svg>
  ),
  '🔭': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='scope-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#bcaaa4'/>
          <stop offset='100%' stopColor='#5d4037'/>
        </linearGradient>
      </defs>
      <path d='M12 40L44 20L48 26L16 46Z' fill='url(#scope-grad)'/>
      <path d='M16 46l8 12M32 36l8 22' stroke='#795548' strokeWidth='4' strokeLinecap='round'/>
      <ellipse cx='46' cy='23' rx='4' ry='8' transform='rotate(30 46 23)' fill='#212121'/>
      <ellipse cx='14' cy='43' rx='2' ry='4' transform='rotate(30 14 43)' fill='#81d4fa'/>
    </svg>
  ),
  '🗺️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='map-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffe082'/>
          <stop offset='100%' stopColor='#ffca28'/>
        </linearGradient>
      </defs>
      <path d='M8 12l16 8 16-8 16 8v40l-16-8-16 8-16-8z' fill='url(#map-grad)'/>
      <path d='M24 20v40M40 12v40' stroke='#ffb300' strokeWidth='2'/>
      <path d='M16 24s4 4 8 0M32 36s4-4 8 0M48 28s-4 4-8 0' stroke='#8d6e63' strokeWidth='2' fill='none'/>
      <circle cx='32' cy='28' r='3' fill='#f44336'/>
      <path d='M32 31l-3-6h6z' fill='#f44336'/>
    </svg>
  ),
  '🗝️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='key-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffd54f'/>
          <stop offset='100%' stopColor='#f57f17'/>
        </linearGradient>
      </defs>
      <circle cx='20' cy='32' r='12' fill='none' stroke='url(#key-grad)' strokeWidth='6'/>
      <path d='M32 32h24' stroke='url(#key-grad)' strokeWidth='6' strokeLinecap='round'/>
      <path d='M44 32v10M52 32v10' stroke='url(#key-grad)' strokeWidth='6' strokeLinecap='round'/>
      <circle cx='20' cy='32' r='4' fill='url(#key-grad)'/>
    </svg>
  ),
  '🧣': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='scarf-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ef5350'/>
          <stop offset='100%' stopColor='#c62828'/>
        </radialGradient>
      </defs>
      <path d='M16 20c0-10 10-12 16-12s16 2 16 12c0 8-6 12-16 12S16 28 16 20z' fill='url(#scarf-grad)'/>
      <path d='M42 24c4 10 6 24 8 32h-8c-2-8-4-20-4-28' fill='url(#scarf-grad)'/>
      <path d='M42 56v6M46 56v6M50 56v6' stroke='#b71c1c' strokeWidth='2'/>
      <path d='M20 20c4-4 12-4 16 0' stroke='#b71c1c' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '💉': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='fluid-grad' x1='0' y1='1' x2='0' y2='0'>
          <stop offset='0%' stopColor='#00e676'/>
          <stop offset='100%' stopColor='#69f0ae'/>
        </linearGradient>
      </defs>
      <path d='M40 16l8 8L24 48l-8-8L40 16z' fill='#e0f2f1' stroke='#b0bec5' strokeWidth='2'/>
      <path d='M36 20l4 4-12 12-4-4 12-12z' fill='url(#fluid-grad)'/>
      <path d='M16 40l-8 8M44 12l8 8' stroke='#90a4ae' strokeWidth='4' strokeLinecap='round'/>
      <path d='M8 48l4 4' stroke='#ff1744' strokeWidth='2'/>
    </svg>
  ),
  '🧥': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='coat-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M20 12l24 0 12 16-8 4-4-12v36H20V20l-4 12-8-4 12-16z' fill='url(#coat-grad)'/>
      <path d='M32 12v44M20 12l12 16 12-16' stroke='#1a100c' strokeWidth='2' fill='none'/>
      <circle cx='28' cy='28' r='2' fill='#d7ccc8'/>
      <circle cx='28' cy='40' r='2' fill='#d7ccc8'/>
      <path d='M32 12c-4-4-8-4-8-4v4l8 4zM32 12c4-4 8-4 8-4v4l-8 4z' fill='#5d4037'/>
    </svg>
  ),
  '🐚': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='shell-grad' cx='0.3' cy='0.7' r='0.7'>
          <stop offset='0%' stopColor='#fff3e0'/>
          <stop offset='100%' stopColor='#ffb74d'/>
        </radialGradient>
      </defs>
      <path d='M32 52c-12 0-24-10-24-24S20 4 32 4s24 10 24 24-12 24-24 24z' fill='url(#shell-grad)'/>
      <path d='M32 52c-4-12 0-24 0-48M32 52c-12-12-8-24-4-46M32 52c12-12 8-24 4-46' stroke='#f57c00' strokeWidth='2' fill='none'/>
      <path d='M24 50l16 0-8 10z' fill='#ffa726'/>
    </svg>
  ),
  '📜': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='scroll-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#fff9c4'/>
          <stop offset='100%' stopColor='#ffe082'/>
        </linearGradient>
      </defs>
      <path d='M16 12h32v40H16z' fill='url(#scroll-grad)'/>
      <ellipse cx='16' cy='16' rx='4' ry='8' fill='#ffca28'/>
      <ellipse cx='16' cy='48' rx='4' ry='8' fill='#ffca28'/>
      <ellipse cx='48' cy='16' rx='4' ry='8' fill='#ffca28'/>
      <ellipse cx='48' cy='48' rx='4' ry='8' fill='#ffca28'/>
      <path d='M24 24h16M24 32h16M24 40h8' stroke='#8d6e63' strokeWidth='2' strokeLinecap='round'/>
      <path d='M44 48c0 4-2 8-4 8s-4-4-4-8' fill='none' stroke='#ffca28' strokeWidth='2'/>
    </svg>
  ),
  '☕': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='cup-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#e0e0e0'/>
        </linearGradient>
      </defs>
      <path d='M16 52c0 4 8 4 16 4s16 0 16-4' fill='#bdbdbd'/>
      <path d='M12 20h32v20c0 8-6 12-16 12S12 48 12 40V20z' fill='url(#cup-grad)'/>
      <path d='M44 24h6c4 0 6 4 6 8s-2 8-6 8h-4' stroke='url(#cup-grad)' strokeWidth='4' fill='none'/>
      <ellipse cx='28' cy='20' rx='16' ry='4' fill='#5d4037'/>
      <path d='M24 12s-2-4 2-8M32 12s2-4-2-8' stroke='#bdbdbd' strokeWidth='2' fill='none' strokeLinecap='round'/>
    </svg>
  ),
  '⭐': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='star-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#fff59d'/>
          <stop offset='100%' stopColor='#fbc02d'/>
        </radialGradient>
      </defs>
      <path d='M32 4l8 18 18 2-14 12 4 18-16-10-16 10 4-18-14-12 18-2 8-18z' fill='url(#star-grad)'/>
      <path d='M32 4l8 18 18 2' stroke='#f57f17' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '✨': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='sparkle-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#ffd54f'/>
        </radialGradient>
      </defs>
      <path d='M32 8c0 12 12 24 24 24-12 0-24 12-24 24 0-12-12-24-24-24 12 0 24-12 24-24z' fill='url(#sparkle-grad)'/>
      <path d='M16 8c0 4 4 8 8 8-4 0-8 4-8 8 0-4-4-8-8-8 4 0 8-4 8-8z' fill='url(#sparkle-grad)'/>
      <path d='M48 44c0 4 4 8 8 8-4 0-8 4-8 8 0-4-4-8-8-8 4 0 8-4 8-8z' fill='url(#sparkle-grad)'/>
    </svg>
  ),
  '🌳': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='tree-leaf' cx='0.5' cy='0.4' r='0.5'>
          <stop offset='0%' stopColor='#81c784'/>
          <stop offset='100%' stopColor='#388e3c'/>
        </radialGradient>
        <linearGradient id='tree-trunk' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#795548'/>
          <stop offset='100%' stopColor='#4e342e'/>
        </linearGradient>
      </defs>
      <path d='M28 40h8v20h-8z' fill='url(#tree-trunk)'/>
      <path d='M28 48s-4-4-8-4M36 44s4-4 8-4' stroke='url(#tree-trunk)' strokeWidth='4' fill='none' strokeLinecap='round'/>
      <circle cx='32' cy='24' r='20' fill='url(#tree-leaf)'/>
      <circle cx='20' cy='28' r='12' fill='url(#tree-leaf)'/>
      <circle cx='44' cy='28' r='12' fill='url(#tree-leaf)'/>
      <circle cx='32' cy='12' r='12' fill='url(#tree-leaf)'/>
    </svg>
  ),
  '📖': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='book-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#fafafa'/>
          <stop offset='100%' stopColor='#e0e0e0'/>
        </linearGradient>
        <linearGradient id='book-cover' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#5d4037'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M32 16c-6-4-16-4-24 0v36c8-4 18-4 24 0 6-4 16-4 24 0V16c-8-4-18-4-24 0z' fill='url(#book-grad)' stroke='url(#book-cover)' strokeWidth='4'/>
      <path d='M32 16v36' stroke='url(#book-cover)' strokeWidth='4'/>
      <path d='M16 28h10M16 36h10M38 28h10M38 36h10' stroke='#9e9e9e' strokeWidth='2'/>
    </svg>
  ),
  '🦅': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='eagle-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#9e9e9e'/>
        </radialGradient>
      </defs>
      <path d='M32 16c8 0 24 8 28 20-12-4-20-4-28 0-8-4-16-4-28 0 4-12 20-20 28-20z' fill='url(#eagle-grad)'/>
      <path d='M32 36l4 20-4-4-4 4 4-20z' fill='url(#eagle-grad)'/>
      <path d='M32 16l4-8-4 4-4-4 4 8z' fill='url(#eagle-grad)'/>
      <path d='M32 16c12 0 28 8 28 20M32 16C20 16 4 24 4 36' stroke='#424242' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🍞': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='bread-grad' cx='0.5' cy='0.6' r='0.6'>
          <stop offset='0%' stopColor='#ffe082'/>
          <stop offset='100%' stopColor='#ffb300'/>
        </radialGradient>
        <linearGradient id='crust-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#f57c00'/>
          <stop offset='100%' stopColor='#e65100'/>
        </linearGradient>
      </defs>
      <path d='M12 28c0-12 8-16 20-16s20 4 20 16v20c0 4-4 8-10 8H22c-6 0-10-4-10-8V28z' fill='url(#bread-grad)' stroke='url(#crust-grad)' strokeWidth='4'/>
      <path d='M12 28c8-4 16-4 20 0 4 4 12 4 20 0' stroke='url(#crust-grad)' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🥩': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='meat-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#e57373'/>
          <stop offset='100%' stopColor='#c62828'/>
        </radialGradient>
      </defs>
      <path d='M16 40c-6-6-4-16 4-20s20-6 28 0 8 16 4 24-16 8-24 4c-6-2-8-4-12-8z' fill='url(#meat-grad)'/>
      <circle cx='24' cy='28' r='4' fill='#ffebee'/>
      <ellipse cx='40' cy='36' rx='6' ry='3' fill='#ffebee' transform='rotate(-30 40 36)'/>
      <path d='M20 40s4-8 12-4M36 20s4 8 8 4' stroke='#ffebee' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🍷': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='wine-glass' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#e0f7fa' stopOpacity='0.4'/>
          <stop offset='100%' stopColor='#b2ebf2' stopOpacity='0.8'/>
        </linearGradient>
        <linearGradient id='wine-liquid' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#b71c1c'/>
          <stop offset='100%' stopColor='#880e4f'/>
        </linearGradient>
      </defs>
      <path d='M20 12l4 24c2 6 6 8 8 8s6-2 8-8l4-24z' fill='url(#wine-liquid)'/>
      <path d='M16 8l6 32c2 8 8 12 10 12s8-4 10-12l6-32H16z' fill='url(#wine-glass)' stroke='#80deea' strokeWidth='2'/>
      <path d='M32 52v8M24 60h16' stroke='#80deea' strokeWidth='4'/>
    </svg>
  ),
  '🍵': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='tea-cup' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#f5f5f5'/>
          <stop offset='100%' stopColor='#bdbdbd'/>
        </linearGradient>
        <linearGradient id='tea-liquid' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#aed581'/>
          <stop offset='100%' stopColor='#558b2f'/>
        </linearGradient>
      </defs>
      <path d='M16 24h32v12c0 10-6 16-16 16s-16-6-16-16V24z' fill='url(#tea-cup)'/>
      <ellipse cx='32' cy='24' rx='16' ry='4' fill='url(#tea-liquid)'/>
      <path d='M24 16s0-4 4-4M32 16s0-4 4-4' stroke='#e0e0e0' strokeWidth='2' fill='none' strokeLinecap='round'/>
    </svg>
  ),
  '🍲': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='pot-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#90a4ae'/>
          <stop offset='100%' stopColor='#455a64'/>
        </linearGradient>
      </defs>
      <path d='M12 36h40v8c0 8-8 12-20 12s-20-4-20-12v-8z' fill='url(#pot-grad)'/>
      <ellipse cx='32' cy='36' rx='20' ry='6' fill='#d84315'/>
      <ellipse cx='24' cy='36' rx='4' ry='2' fill='#ffcc80'/>
      <ellipse cx='40' cy='34' rx='3' ry='2' fill='#81c784'/>
      <path d='M8 36h4M52 36h4' stroke='url(#pot-grad)' strokeWidth='4' strokeLinecap='round'/>
      <path d='M24 24s-2-6 2-8M32 24s-2-6 2-8M40 24s-2-6 2-8' stroke='#e0e0e0' strokeWidth='2' fill='none' strokeLinecap='round'/>
    </svg>
  ),
  '🥕': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='carrot-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ff9800'/>
          <stop offset='100%' stopColor='#e65100'/>
        </linearGradient>
      </defs>
      <path d='M48 20C48 20 24 56 16 56C8 56 12 44 12 44L40 12C44 8 52 12 48 20z' fill='url(#carrot-grad)'/>
      <path d='M28 32l-4 4M36 24l-4 4M42 18l-4 4' stroke='#e65100' strokeWidth='2' strokeLinecap='round'/>
      <path d='M44 12c-2-8 0-10 0-10s8 2 8 8c0 4-4 8-8 2z' fill='#4caf50'/>
    </svg>
  ),
  '🍎': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='apple-grad' cx='0.3' cy='0.3' r='0.7'>
          <stop offset='0%' stopColor='#ff8a80'/>
          <stop offset='100%' stopColor='#d50000'/>
        </radialGradient>
      </defs>
      <path d='M32 16c8-4 20 0 20 16 0 16-8 24-20 24s-20-8-20-24c0-16 12-20 20-16z' fill='url(#apple-grad)'/>
      <path d='M32 16s2-8 8-12' stroke='#5d4037' strokeWidth='4' fill='none' strokeLinecap='round'/>
      <path d='M40 4c4 0 8 4 8 8s-4 4-8 4-8-4-8-4 4-8 8-8z' fill='#4caf50'/>
    </svg>
  ),
  '💧': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='drop-grad' cx='0.3' cy='0.3' r='0.7'>
          <stop offset='0%' stopColor='#b3e5fc'/>
          <stop offset='100%' stopColor='#0288d1'/>
        </radialGradient>
      </defs>
      <path d='M32 8C32 8 16 32 16 44c0 8 8 12 16 12s16-4 16-12C48 32 32 8 32 8z' fill='url(#drop-grad)'/>
      <path d='M24 44a8 8 0 0 0 8 8' stroke='#e1f5fe' strokeWidth='2' fill='none' strokeLinecap='round'/>
    </svg>
  ),
  '🍘': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='cracker-grad' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffcc80'/>
          <stop offset='100%' stopColor='#ef6c00'/>
        </radialGradient>
      </defs>
      <circle cx='32' cy='32' r='20' fill='url(#cracker-grad)'/>
      <rect x='24' y='24' width='16' height='16' fill='#212121'/>
      <circle cx='28' cy='20' r='1' fill='#8d6e63'/>
      <circle cx='36' cy='44' r='1' fill='#8d6e63'/>
      <circle cx='44' cy='28' r='1' fill='#8d6e63'/>
    </svg>
  ),
  '🍱': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='bento-box' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#b71c1c'/>
          <stop offset='100%' stopColor='#4a148c'/>
        </linearGradient>
      </defs>
      <rect x='8' y='16' width='48' height='32' rx='4' fill='url(#bento-box)'/>
      <rect x='12' y='20' width='24' height='24' rx='2' fill='#ffe082'/>
      <rect x='40' y='20' width='12' height='10' rx='2' fill='#aed581'/>
      <rect x='40' y='34' width='12' height='10' rx='2' fill='#ef9a9a'/>
      <circle cx='24' cy='32' r='4' fill='#f44336'/>
    </svg>
  ),
  '🍝': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='plate-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#e0e0e0'/>
        </linearGradient>
      </defs>
      <ellipse cx='32' cy='44' rx='24' ry='8' fill='url(#plate-grad)'/>
      <path d='M20 40c0-8 8-16 12-16s12 8 12 16' fill='#ffe082'/>
      <path d='M24 36c4-4 8 4 12 0s4-8 0-4-12 4-8 8' stroke='#fdd835' strokeWidth='2' fill='none'/>
      <circle cx='32' cy='32' r='4' fill='#e53935'/>
      <circle cx='28' cy='36' r='2' fill='#8d6e63'/>
      <circle cx='36' cy='38' r='2' fill='#8d6e63'/>
    </svg>
  ),
  '🔄': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='transform-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffea00'/>
          <stop offset='100%' stopColor='#ff5722'/>
        </linearGradient>
      </defs>
      <path d='M32 10A22 22 0 1 1 10 32' stroke='url(#transform-grad)' strokeWidth='6' strokeLinecap='round'/>
      <path d='M10 20L10 36L26 36' stroke='url(#transform-grad)' strokeWidth='6' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M32 54A22 22 0 1 1 54 32' stroke='url(#transform-grad)' strokeWidth='6' strokeLinecap='round'/>
      <path d='M54 44L54 28L38 28' stroke='url(#transform-grad)' strokeWidth='6' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  ),
  '⚡': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='titan-lightning' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#fff59d'/>
          <stop offset='50%' stopColor='#ffeb3b'/>
          <stop offset='100%' stopColor='#f57f17'/>
        </linearGradient>
        <filter id='lightning-glow'>
          <feGaussianBlur stdDeviation='2' result='coloredBlur'/>
          <feMerge>
            <feMergeNode in='coloredBlur'/>
            <feMergeNode in='SourceGraphic'/>
          </feMerge>
        </filter>
      </defs>
      <path d='M36 4L16 34H32L28 60L52 26H36L40 4Z' fill='url(#titan-lightning)' filter='url(#lightning-glow)' stroke='#fff' strokeWidth='1'/>
    </svg>
  ),
  '🦴': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='bone-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#f5f5f5'/>
          <stop offset='100%' stopColor='#bdbdbd'/>
        </linearGradient>
      </defs>
      <path d='M46.5 12.5C49 10 54 10 54 15C54 18 51 19 48.5 19L19 48.5C19 51 18 54 15 54C10 54 10 49 12.5 46.5C10 44 10 39 15 39C18 39 19 40 21.5 42.5L51 13C51 10.5 50 9.5 47 9.5C44.5 9.5 44 11 46.5 12.5Z' fill='url(#bone-grad)' stroke='#757575' strokeWidth='2'/>
    </svg>
  ),
  '🩸': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='blood-grad' cx='0.3' cy='0.3' r='0.7'>
          <stop offset='0%' stopColor='#ff5252'/>
          <stop offset='100%' stopColor='#b71c1c'/>
        </radialGradient>
      </defs>
      <path d='M32 8C32 8 12 36 12 46C12 56 20 60 32 60C44 60 52 56 52 46C52 36 32 8 32 8Z' fill='url(#blood-grad)'/>
      <path d='M22 46A10 10 0 0 0 32 56' stroke='#ff8a80' strokeWidth='3' strokeLinecap='round' fill='none'/>
    </svg>
  ),
  '👁️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='titan-eye-glow' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#76ff03'/>
          <stop offset='100%' stopColor='#33691e'/>
        </radialGradient>
        <linearGradient id='flesh-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M4 32C4 32 16 16 32 16C48 16 60 32 60 32C60 32 48 48 32 48C16 48 4 32 4 32Z' fill='url(#flesh-grad)' stroke='#212121' strokeWidth='2'/>
      <path d='M8 32C8 32 18 20 32 20C46 20 56 32 56 32C56 32 46 44 32 44C18 44 8 32 8 32Z' fill='#fff'/>
      <circle cx='32' cy='32' r='10' fill='url(#titan-eye-glow)'/>
      <circle cx='32' cy='32' r='4' fill='#000'/>
      <path d='M36 28A4 4 0 0 1 36 28' stroke='#ccff90' strokeWidth='2' strokeLinecap='round'/>
    </svg>
  ),
  '💪': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='muscle-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#d32f2f'/>
          <stop offset='100%' stopColor='#7f0000'/>
        </linearGradient>
      </defs>
      <path d='M50 16C46 16 42 20 40 24C36 20 28 20 24 24C12 24 6 36 6 48C6 54 12 58 18 58C30 58 36 50 40 40C44 48 50 52 56 52C60 52 62 48 62 40C62 26 56 16 50 16Z' fill='url(#muscle-grad)'/>
      <path d='M24 24C28 28 32 36 32 44M14 36C20 40 24 48 24 54M44 26C48 32 52 40 52 48' stroke='#ff5252' strokeWidth='2' strokeLinecap='round'/>
    </svg>
  ),
  '🦷': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='fang-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#fff59d'/>
        </linearGradient>
      </defs>
      <path d='M20 12C20 12 16 32 32 56C48 32 44 12 44 12C44 12 40 24 32 24C24 24 20 12 20 12Z' fill='url(#fang-grad)' stroke='#e0e0e0' strokeWidth='2'/>
      <path d='M20 12C20 4 28 4 32 8C36 4 44 4 44 12' fill='#ffe082'/>
    </svg>
  ),
  '🌀': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='crystal-spiral' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#00e5ff'/>
          <stop offset='100%' stopColor='#006064'/>
        </linearGradient>
      </defs>
      <path d='M32 10C20 10 10 20 10 32C10 44 20 54 32 54C40 54 48 48 52 40C56 30 50 20 40 18C32 16 22 22 20 32C18 40 24 46 32 46C36 46 40 42 40 38' stroke='url(#crystal-spiral)' strokeWidth='6' strokeLinecap='round' fill='none'/>
      <path d='M32 10L36 4L42 12' stroke='url(#crystal-spiral)' strokeWidth='4' fill='none'/>
    </svg>
  ),
  '👑': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='crown-gold' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffea00'/>
          <stop offset='100%' stopColor='#ff8f00'/>
        </linearGradient>
      </defs>
      <path d='M8 48L12 20L24 32L32 12L40 32L52 20L56 48H8Z' fill='url(#crown-gold)' stroke='#5d4037' strokeWidth='2'/>
      <rect x='10' y='50' width='44' height='6' fill='#d84315' stroke='#5d4037' strokeWidth='2'/>
      <circle cx='32' cy='12' r='4' fill='#00e5ff'/>
      <circle cx='12' cy='20' r='3' fill='#ff1744'/>
      <circle cx='52' cy='20' r='3' fill='#ff1744'/>
    </svg>
  ),
  '💎': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='warhammer-crystal' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#e0f7fa'/>
          <stop offset='100%' stopColor='#00b8d4'/>
        </linearGradient>
      </defs>
      <path d='M32 4L48 24L32 60L16 24Z' fill='url(#warhammer-crystal)' stroke='#ffffff' strokeWidth='2'/>
      <path d='M32 4L40 24L32 60' fill='#00838f' opacity='0.4'/>
      <path d='M16 24H48' stroke='#ffffff' strokeWidth='2'/>
    </svg>
  ),
  '🐗': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='cart-fur' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M12 44C12 44 8 28 20 20C32 12 48 16 56 28C60 36 56 48 48 48C40 48 32 36 32 36C32 36 24 48 16 48C12 48 12 44 12 44Z' fill='url(#cart-fur)'/>
      <path d='M56 28C64 36 56 48 56 48L44 40Z' fill='#d7ccc8'/>
      <circle cx='44' cy='24' r='3' fill='#000'/>
      <path d='M32 36L40 48L32 40Z' fill='#ffca28'/>
    </svg>
  ),
  '🦎': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='jaw-bone' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#cfd8dc'/>
          <stop offset='100%' stopColor='#546e7a'/>
        </linearGradient>
      </defs>
      <path d='M12 40C12 40 20 24 32 24C44 24 52 40 52 40C52 40 40 56 32 56C24 56 12 40 12 40Z' fill='url(#jaw-bone)' stroke='#263238' strokeWidth='2'/>
      <path d='M12 40L24 44L32 40L40 44L52 40' stroke='#263238' strokeWidth='4' fill='none'/>
      <path d='M20 32L24 28M44 32L40 28' stroke='#263238' strokeWidth='2' strokeLinecap='round'/>
    </svg>
  ),
  '🏰': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='wall-stone' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#9e9e9e'/>
          <stop offset='100%' stopColor='#424242'/>
        </linearGradient>
      </defs>
      <path d='M8 20V60H56V20H48V28H40V20H32V28H24V20H16V28H8V20Z' fill='url(#wall-stone)'/>
      <path d='M8 20H16V28H8V20ZM24 20H32V28H24V20ZM40 20H48V28H40V20Z' fill='#757575'/>
      <rect x='24' y='40' width='16' height='20' rx='8' fill='#3e2723'/>
      <path d='M28 40H36V60H28V40Z' fill='#212121' opacity='0.5'/>
    </svg>
  ),
  '🏔️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='mt-snow' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ffffff'/>
          <stop offset='100%' stopColor='#b0bec5'/>
        </linearGradient>
        <linearGradient id='mt-rock' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#78909c'/>
          <stop offset='100%' stopColor='#37474f'/>
        </linearGradient>
      </defs>
      <path d='M32 12L4 52H60L32 12Z' fill='url(#mt-rock)'/>
      <path d='M32 12L20 28L28 24L36 32L44 24L32 12Z' fill='url(#mt-snow)'/>
    </svg>
  ),
  '🌊': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='ocean-wave' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#00bcd4'/>
          <stop offset='100%' stopColor='#0d47a1'/>
        </linearGradient>
      </defs>
      <path d='M60 48C50 48 40 40 32 40C24 40 16 52 4 52V60H60V48Z' fill='url(#ocean-wave)'/>
      <path d='M4 44C16 44 24 32 32 32C40 32 50 44 60 44C60 32 52 20 40 20C32 20 24 28 16 28C10 28 4 24 4 24V44Z' fill='#4dd0e1' opacity='0.8'/>
      <circle cx='40' cy='24' r='4' fill='#ffffff'/>
    </svg>
  ),
  '🏚️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='ruin-wood' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#795548'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M12 32L32 16L40 24L40 32H12Z' fill='url(#ruin-wood)'/>
      <path d='M16 32V56H28V40H36V56H48V36' fill='#9e9e9e' stroke='#424242' strokeWidth='2'/>
      <path d='M12 56L24 44L36 56' fill='#616161'/>
      <path d='M32 16L44 24L52 20' stroke='url(#ruin-wood)' strokeWidth='4' fill='none'/>
    </svg>
  ),
  '⛪': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='crystal-chapel' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#e0f7fa'/>
          <stop offset='100%' stopColor='#00838f'/>
        </linearGradient>
      </defs>
      <path d='M32 8L16 24V56H48V24L32 8Z' fill='url(#crystal-chapel)' stroke='#ffffff' strokeWidth='2'/>
      <path d='M32 8V56M16 24H48M24 56V32L32 24L40 32V56' stroke='#80deea' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🌲': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='giant-tree' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#2e7d32'/>
          <stop offset='100%' stopColor='#1b5e20'/>
        </linearGradient>
        <linearGradient id='trunk-wood' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#5d4037'/>
          <stop offset='100%' stopColor='#3e2723'/>
        </linearGradient>
      </defs>
      <path d='M28 40H36V64H28V40Z' fill='url(#trunk-wood)'/>
      <path d='M32 4L12 28H24L16 44H48L40 28H52L32 4Z' fill='url(#giant-tree)'/>
    </svg>
  ),
  '🏜️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='desert-sand' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ffe082'/>
          <stop offset='100%' stopColor='#ffb300'/>
        </linearGradient>
      </defs>
      <path d='M4 48C20 40 32 44 40 52C48 60 56 56 60 52V60H4V48Z' fill='url(#desert-sand)'/>
      <path d='M60 40C44 32 32 36 24 44C16 52 8 48 4 44V60H60V40Z' fill='#ffca28' opacity='0.8'/>
      <circle cx='48' cy='16' r='8' fill='#ff8f00'/>
    </svg>
  ),
  '🌉': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='bridge-stone' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#b0bec5'/>
          <stop offset='100%' stopColor='#78909c'/>
        </linearGradient>
      </defs>
      <path d='M4 32H60V40H4V32Z' fill='url(#bridge-stone)'/>
      <path d='M12 40V60M24 40V60M40 40V60M52 40V60' stroke='#546e7a' strokeWidth='4'/>
      <path d='M4 32C16 20 48 20 60 32' stroke='#455a64' strokeWidth='4' fill='none'/>
      <path d='M16 27V32M32 23V32M48 27V32' stroke='#455a64' strokeWidth='2'/>
    </svg>
  ),
  '🗼': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='tower-stone' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#cfd8dc'/>
          <stop offset='100%' stopColor='#78909c'/>
        </linearGradient>
      </defs>
      <path d='M24 16L28 60H36L40 16Z' fill='url(#tower-stone)'/>
      <path d='M20 16H44V24H20V16Z' fill='#90a4ae'/>
      <path d='M32 4L24 16H40L32 4Z' fill='#455a64'/>
      <rect x='30' y='32' width='4' height='8' fill='#263238'/>
    </svg>
  ),
  '🏛️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gov-bldg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#eceff1'/>
          <stop offset='100%' stopColor='#b0bec5'/>
        </linearGradient>
      </defs>
      <path d='M32 12L8 28H56L32 12Z' fill='url(#gov-bldg)'/>
      <path d='M12 28H52V32H12V28Z' fill='#cfd8dc'/>
      <path d='M16 32V56M24 32V56M32 32V56M40 32V56M48 32V56' stroke='#90a4ae' strokeWidth='4'/>
      <path d='M8 56H56V60H8V56Z' fill='#cfd8dc'/>
    </svg>
  ),
  '⛰️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='peak-rock' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#4e342e'/>
        </linearGradient>
      </defs>
      <path d='M32 16L12 56H52L32 16Z' fill='url(#peak-rock)'/>
      <path d='M32 16L24 36L32 44L40 32L32 16Z' fill='#a1887f' opacity='0.5'/>
      <path d='M16 48L8 60H24L16 48Z' fill='#5d4037'/>
      <path d='M48 40L36 60H60L48 40Z' fill='#5d4037'/>
    </svg>
  ),
  '🚪': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gate-wood' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#5d4037'/>
          <stop offset='100%' stopColor='#212121'/>
        </linearGradient>
      </defs>
      <path d='M16 12C16 12 32 4 48 12V60H16V12Z' fill='url(#gate-wood)' stroke='#424242' strokeWidth='4'/>
      <path d='M32 12V60' stroke='#3e2723' strokeWidth='4'/>
      <circle cx='28' cy='36' r='2' fill='#9e9e9e'/>
      <circle cx='36' cy='36' r='2' fill='#9e9e9e'/>
      <path d='M16 24H48M16 48H48' stroke='#424242' strokeWidth='4'/>
    </svg>
  ),
  '🎖️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='medal-gold' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffe082'/>
          <stop offset='100%' stopColor='#ff8f00'/>
        </linearGradient>
        <linearGradient id='medal-ribbon' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#2e7d32'/>
          <stop offset='100%' stopColor='#1b5e20'/>
        </linearGradient>
      </defs>
      <path d='M24 4L20 28L32 20L44 28L40 4H24Z' fill='url(#medal-ribbon)'/>
      <circle cx='32' cy='44' r='16' fill='url(#medal-gold)' stroke='#ff6f00' strokeWidth='2'/>
      <path d='M26 44L38 44M32 38L32 50' stroke='#fff8e1' strokeWidth='4'/>
    </svg>
  ),
  '📯': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='bugle-brass' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#ffca28'/>
          <stop offset='100%' stopColor='#f57f17'/>
        </linearGradient>
      </defs>
      <path d='M12 40C12 40 4 32 12 24C20 16 32 16 40 24L56 16V48L40 40C32 48 20 48 12 40Z' fill='none' stroke='url(#bugle-brass)' strokeWidth='6' strokeLinecap='round'/>
      <path d='M40 24C44 28 44 36 40 40' stroke='url(#bugle-brass)' strokeWidth='4' fill='none'/>
    </svg>
  ),
  '🏳️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='flag-grad' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#4caf50'/>
          <stop offset='100%' stopColor='#1b5e20'/>
        </linearGradient>
      </defs>
      <path d='M16 8V60' stroke='#795548' strokeWidth='4' strokeLinecap='round'/>
      <path d='M16 12C24 8 32 16 40 12C48 8 56 16 56 16V36C56 36 48 28 40 32C32 36 24 28 16 32V12Z' fill='url(#flag-grad)'/>
      <circle cx='36' cy='24' r='6' fill='#ffffff' opacity='0.8'/>
    </svg>
  ),
  '⚙️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='gear-metal' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#b0bec5'/>
          <stop offset='100%' stopColor='#546e7a'/>
        </linearGradient>
      </defs>
      <path d='M32 12A20 20 0 1 0 32 52A20 20 0 1 0 32 12Z' fill='none' stroke='url(#gear-metal)' strokeWidth='8'/>
      <path d='M32 4V12M32 52V60M12 32H4M60 32H52M18 18L12 12M52 52L46 46M46 18L52 12M12 52L18 46' stroke='url(#gear-metal)' strokeWidth='8' strokeLinecap='round'/>
      <circle cx='32' cy='32' r='6' fill='#263238'/>
    </svg>
  ),
  '🔒': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='lock-silver' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#eceff1'/>
          <stop offset='100%' stopColor='#90a4ae'/>
        </linearGradient>
      </defs>
      <rect x='16' y='32' width='32' height='24' rx='4' fill='url(#lock-silver)'/>
      <path d='M20 32V20C20 12 44 12 44 20V32' stroke='#b0bec5' strokeWidth='6' fill='none'/>
      <circle cx='32' cy='44' r='4' fill='#263238'/>
      <path d='M32 44V50' stroke='#263238' strokeWidth='2'/>
    </svg>
  ),
  '🌹': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='rose-red' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ff5252'/>
          <stop offset='100%' stopColor='#b71c1c'/>
        </radialGradient>
      </defs>
      <path d='M32 60C32 60 32 40 24 36' stroke='#4caf50' strokeWidth='4' fill='none'/>
      <path d='M32 44L40 40C40 40 36 32 32 36' fill='#388e3c'/>
      <circle cx='32' cy='24' r='16' fill='url(#rose-red)'/>
      <path d='M24 24C24 16 40 16 40 24C40 32 24 32 24 24Z' stroke='#ff8a80' strokeWidth='2' fill='none'/>
      <path d='M28 24C28 20 36 20 36 24C36 28 28 28 28 24Z' stroke='#ff8a80' strokeWidth='2' fill='none'/>
    </svg>
  ),
  '🗻': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='maria-wall' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#ef9a9a'/>
          <stop offset='100%' stopColor='#c62828'/>
        </linearGradient>
      </defs>
      <path d='M32 12L12 52H52L32 12Z' fill='url(#maria-wall)'/>
      <path d='M32 12L24 28H40L32 12Z' fill='#ffffff'/>
      <circle cx='32' cy='36' r='6' fill='#ffffff' opacity='0.5'/>
    </svg>
  ),
  '👥': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='group-shadow' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#757575'/>
          <stop offset='100%' stopColor='#212121'/>
        </linearGradient>
      </defs>
      <path d='M24 24A8 8 0 1 1 24 8A8 8 0 1 1 24 24ZM12 44C12 36 20 32 24 32C28 32 36 36 36 44V56H12V44Z' fill='url(#group-shadow)'/>
      <path d='M44 28A6 6 0 1 1 44 16A6 6 0 1 1 44 28ZM36 44C36 38 40 36 44 36C48 36 52 38 52 44V56H36V44Z' fill='#9e9e9e'/>
    </svg>
  ),
  '📋': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='clip-wood' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#8d6e63'/>
          <stop offset='100%' stopColor='#4e342e'/>
        </linearGradient>
      </defs>
      <rect x='12' y='12' width='40' height='48' rx='4' fill='url(#clip-wood)'/>
      <rect x='16' y='20' width='32' height='36' fill='#f5f5f5'/>
      <rect x='24' y='8' width='16' height='8' rx='2' fill='#90a4ae'/>
      <path d='M20 28H44M20 36H44M20 44H36' stroke='#bdbdbd' strokeWidth='2'/>
    </svg>
  ),
  '🕯️': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='flame-glow' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0%' stopColor='#ffff00'/>
          <stop offset='100%' stopColor='#ff3d00'/>
        </radialGradient>
        <linearGradient id='wax-grad' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#fff8e1'/>
          <stop offset='100%' stopColor='#ffecb3'/>
        </linearGradient>
      </defs>
      <path d='M32 8C28 16 28 20 32 24C36 20 36 16 32 8Z' fill='url(#flame-glow)'/>
      <rect x='24' y='28' width='16' height='32' fill='url(#wax-grad)'/>
      <path d='M24 28C24 32 28 36 32 32C36 28 40 32 40 28V36C40 36 36 40 32 36C28 32 24 36 24 36V28Z' fill='#ffecb3'/>
    </svg>
  ),
  '🎪': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='tent-grad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#4caf50'/>
          <stop offset='100%' stopColor='#2e7d32'/>
        </linearGradient>
      </defs>
      <path d='M32 16L8 48H24L32 32L40 48H56L32 16Z' fill='url(#tent-grad)'/>
      <path d='M24 48L32 32L40 48Z' fill='#212121' opacity='0.7'/>
      <path d='M32 8V16' stroke='#795548' strokeWidth='4'/>
      <path d='M32 8L40 12L32 12Z' fill='#f44336'/>
    </svg>
  ),
  '🪖': (
    <svg viewBox='0 0 64 64' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='helmet-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#558b2f'/>
          <stop offset='100%' stopColor='#33691e'/>
        </linearGradient>
      </defs>
      <path d='M12 40C12 24 20 16 32 16C44 16 52 24 52 40H12Z' fill='url(#helmet-grad)'/>
      <path d='M8 40H56C56 44 48 48 32 48C16 48 8 44 8 40Z' fill='#2e7d32'/>
      <path d='M32 16V24' stroke='#1b5e20' strokeWidth='4'/>
    </svg>
  )
};
