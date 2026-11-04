import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-slate-900/90 text-amber-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-200 hover:-rotate-12" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="font-semibold">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
}

