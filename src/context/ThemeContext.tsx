
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
  const [theme, setTheme] = useState<ThemeType>('light');

  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'purple', 'ocean', 'sunset', 'forest', 'midnight', 'coffee'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    // Remove any previous theme classes from html element
    const htmlElement = document.documentElement;
    htmlElement.classList.remove(
      'light', 
      'dark', 
      'purple', 
      'ocean', 
      'sunset', 
      'forest', 
      'midnight', 
      'coffee'
    );
    
    // Add current theme class to html element
    htmlElement.classList.add(theme);
    
    // Also set data attribute for more specific targeting
    htmlElement.setAttribute('data-theme', theme);
    
    console.log(`Theme changed to: ${theme}`);
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
