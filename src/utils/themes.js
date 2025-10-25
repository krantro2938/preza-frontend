// Theme configurations for different presentation styles
export const themes = {
  minimal: {
    name: 'Минималистичный',
    title: {
      bg: 'bg-indigo-600',
      bgRgb: 'rgb(99, 102, 241)',
      text: 'text-white',
    },
    content: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'text-indigo-500',
      accentRgb: 'rgb(99, 102, 241)',
      line: 'bg-indigo-600',
      bullet: 'text-indigo-500',
    },
  },
  professional: {
    name: 'Профессиональный',
    title: {
      bg: 'bg-slate-800',
      bgRgb: 'rgb(30, 41, 59)',
      text: 'text-white',
    },
    content: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'text-blue-600',
      accentRgb: 'rgb(37, 99, 235)',
      line: 'bg-blue-600',
      bullet: 'text-blue-600',
    },
  },
  creative: {
    name: 'Креативный',
    title: {
      bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
      bgRgb: 'rgb(147, 51, 234)',
      text: 'text-white',
    },
    content: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'text-pink-500',
      accentRgb: 'rgb(236, 72, 153)',
      line: 'bg-gradient-to-r from-purple-500 to-pink-500',
      bullet: 'text-pink-500',
    },
  },
  academic: {
    name: 'Академический',
    title: {
      bg: 'bg-emerald-700',
      bgRgb: 'rgb(4, 120, 87)',
      text: 'text-white',
    },
    content: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'text-emerald-600',
      accentRgb: 'rgb(5, 150, 105)',
      line: 'bg-emerald-600',
      bullet: 'text-emerald-600',
    },
  },
  dark: {
    name: 'Тёмный',
    title: {
      bg: 'bg-gray-900',
      bgRgb: 'rgb(17, 24, 39)',
      text: 'text-white',
    },
    content: {
      bg: 'bg-gray-900',
      bgRgb: 'rgb(17, 24, 39)',
      text: 'text-gray-100',
      textRgb: 'rgb(243, 244, 246)',
      accent: 'text-cyan-400',
      accentRgb: 'rgb(34, 211, 238)',
      line: 'bg-cyan-500',
      bullet: 'text-cyan-400',
    },
  },
};

// Get theme by style name, with fallback to minimal
export const getTheme = (style) => {
  return themes[style] || themes.minimal;
};
