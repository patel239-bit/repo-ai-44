
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system' | 'midnight' | 'forest' | 'ocean' | 'sunset' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  light: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: '0 0% 100%',
    cardForeground: '222.2 84% 4.9%',
    popover: '0 0% 100%',
    popoverForeground: '222.2 84% 4.9%',
    primary: '221 83% 53%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '221 83% 53%'
  },
  dark: {
    background: '220 13% 18%',
    foreground: '220 9% 86%',
    card: '220 13% 18%',
    cardForeground: '220 9% 86%',
    popover: '220 13% 18%',
    popoverForeground: '220 9% 86%',
    primary: '221 83% 53%',
    primaryForeground: '220 13% 18%',
    secondary: '220 13% 28%',
    secondaryForeground: '220 9% 86%',
    muted: '220 13% 28%',
    mutedForeground: '220 9% 55%',
    accent: '220 13% 28%',
    accentForeground: '220 9% 86%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
    border: '220 13% 28%',
    input: '220 13% 28%',
    ring: '221 83% 53%'
  },
  midnight: {
    background: '240 10% 8%',
    foreground: '240 5% 84%',
    card: '240 10% 12%',
    cardForeground: '240 5% 84%',
    popover: '240 10% 12%',
    popoverForeground: '240 5% 84%',
    primary: '142 76% 36%',
    primaryForeground: '355.7 100% 97.3%',
    secondary: '240 4.8% 95.9%',
    secondaryForeground: '240 5.9% 10%',
    muted: '240 5% 26%',
    mutedForeground: '240 5% 64.9%',
    accent: '240 5% 26%',
    accentForeground: '240 9% 89%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '240 6% 20%',
    input: '240 6% 20%',
    ring: '142 76% 36%'
  },
  forest: {
    background: '140 30% 8%',
    foreground: '140 5% 84%',
    card: '140 25% 12%',
    cardForeground: '140 5% 84%',
    popover: '140 25% 12%',
    popoverForeground: '140 5% 84%',
    primary: '120 100% 25%',
    primaryForeground: '0 0% 98%',
    secondary: '140 20% 20%',
    secondaryForeground: '140 5% 84%',
    muted: '140 20% 20%',
    mutedForeground: '140 5% 64.9%',
    accent: '140 20% 25%',
    accentForeground: '140 5% 84%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '140 20% 18%',
    input: '140 20% 18%',
    ring: '120 100% 25%'
  },
  ocean: {
    background: '200 50% 8%',
    foreground: '200 5% 84%',
    card: '200 45% 12%',
    cardForeground: '200 5% 84%',
    popover: '200 45% 12%',
    popoverForeground: '200 5% 84%',
    primary: '210 100% 50%',
    primaryForeground: '0 0% 98%',
    secondary: '200 30% 20%',
    secondaryForeground: '200 5% 84%',
    muted: '200 30% 20%',
    mutedForeground: '200 5% 64.9%',
    accent: '200 30% 25%',
    accentForeground: '200 5% 84%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '200 30% 18%',
    input: '200 30% 18%',
    ring: '210 100% 50%'
  },
  sunset: {
    background: '25 30% 8%',
    foreground: '25 5% 84%',
    card: '25 25% 12%',
    cardForeground: '25 5% 84%',
    popover: '25 25% 12%',
    popoverForeground: '25 5% 84%',
    primary: '15 100% 55%',
    primaryForeground: '0 0% 98%',
    secondary: '25 20% 20%',
    secondaryForeground: '25 5% 84%',
    muted: '25 20% 20%',
    mutedForeground: '25 5% 64.9%',
    accent: '25 20% 25%',
    accentForeground: '25 5% 84%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '25 20% 18%',
    input: '25 20% 18%',
    ring: '15 100% 55%'
  },
  purple: {
    background: '270 30% 8%',
    foreground: '270 5% 84%',
    card: '270 25% 12%',
    cardForeground: '270 5% 84%',
    popover: '270 25% 12%',
    popoverForeground: '270 5% 84%',
    primary: '270 95% 75%',
    primaryForeground: '270 30% 8%',
    secondary: '270 20% 20%',
    secondaryForeground: '270 5% 84%',
    muted: '270 20% 20%',
    mutedForeground: '270 5% 64.9%',
    accent: '270 20% 25%',
    accentForeground: '270 5% 84%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '270 20% 18%',
    input: '270 20% 18%',
    ring: '270 95% 75%'
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');

  const applyTheme = (selectedTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'midnight', 'forest', 'ocean', 'sunset', 'purple');

    let themeToApply: 'dark' | 'light';
    let colorScheme: any;

    if (selectedTheme === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      colorScheme = themes[themeToApply];
    } else if (selectedTheme === 'light') {
      themeToApply = 'light';
      colorScheme = themes.light;
    } else {
      themeToApply = 'dark';
      colorScheme = themes[selectedTheme] || themes.dark;
    }

    root.classList.add(selectedTheme === 'system' ? themeToApply : selectedTheme);
    setActualTheme(themeToApply);

    // Apply CSS custom properties
    Object.entries(colorScheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });

    // Set sidebar colors based on the theme
    const sidebarColors = {
      background: colorScheme.card,
      foreground: colorScheme.cardForeground,
      primary: colorScheme.primary,
      primaryForeground: colorScheme.primaryForeground,
      accent: colorScheme.accent,
      accentForeground: colorScheme.accentForeground,
      border: colorScheme.border,
      ring: colorScheme.ring
    };

    Object.entries(sidebarColors).forEach(([key, value]) => {
      root.style.setProperty(`--sidebar-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(theme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
