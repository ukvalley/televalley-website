import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tv_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('tv_theme', theme);

    if (theme === 'light') {
      root.style.setProperty('--color-bg', '#FFFFFF');
      root.style.setProperty('--color-surface', '#F6F8FA');
      root.style.setProperty('--color-text', '#1F2328');
      root.style.setProperty('--color-muted', '#656D76');
      root.style.setProperty('--color-secondary', '#E5E7EB');
    } else {
      root.style.setProperty('--color-bg', '#0D1117');
      root.style.setProperty('--color-surface', '#161B22');
      root.style.setProperty('--color-text', '#E6EDF3');
      root.style.setProperty('--color-muted', '#8B949E');
      root.style.setProperty('--color-secondary', '#1E293B');
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
