
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'purple' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'coffee';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  themeLabel: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'light';
  });

  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'purple', 'ocean', 'sunset', 'forest', 'midnight', 'coffee'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Remove any previous theme classes
    document.documentElement.classList.remove(
      'theme-light', 
      'theme-dark', 
      'theme-purple', 
      'theme-ocean', 
      'theme-sunset', 
      'theme-forest', 
      'theme-midnight', 
      'theme-coffee'
    );
    
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themeLabel }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
