import { create } from 'zustand';

const THEME_KEY = 'studybuddy_theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

export const useThemeStore = create((set, get) => {
  const initialTheme = getInitialTheme();
  applyThemeToDocument(initialTheme);

  return {
    theme: initialTheme,
    toggleTheme: () => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (err) {
        console.warn('Could not persist theme to localStorage', err);
      }
      applyThemeToDocument(nextTheme);
      set({ theme: nextTheme });
    },
    setTheme: (newTheme) => {
      if (newTheme !== 'dark' && newTheme !== 'light') return;
      try {
        localStorage.setItem(THEME_KEY, newTheme);
      } catch (err) {
        console.warn('Could not persist theme to localStorage', err);
      }
      applyThemeToDocument(newTheme);
      set({ theme: newTheme });
    },
  };
});

