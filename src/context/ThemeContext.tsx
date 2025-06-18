
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'purple' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'coffee';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  themeLabel: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// CSS styles cho các theme
const themeStyles = `
  /* Light Theme */
  .theme-light {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #e2e8f0;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --accent: #3b82f6;
    --accent-hover: #2563eb;
    --border: #e2e8f0;
    --shadow: rgba(0, 0, 0, 0.1);
  }

  /* Dark Theme */
  .theme-dark {
    --bg-primary: #000000;
    --bg-secondary: #111111;
    --bg-tertiary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #e0e0e0;
    --text-muted: #a0a0a0;
    --accent: #3b82f6;
    --accent-hover: #2563eb;
    --border: #333333;
    --shadow: rgba(0, 0, 0, 0.5);
  }

  /* Purple Theme */
  .theme-purple {
    --bg-primary: #faf5ff;
    --bg-secondary: #f3e8ff;
    --bg-tertiary: #e9d5ff;
    --text-primary: #581c87;
    --text-secondary: #7c3aed;
    --text-muted: #a855f7;
    --accent: #8b5cf6;
    --accent-hover: #7c3aed;
    --border: #e9d5ff;
    --shadow: rgba(139, 92, 246, 0.2);
  }

  /* Ocean Theme */
  .theme-ocean {
    --bg-primary: #f0fdff;
    --bg-secondary: #cffafe;
    --bg-tertiary: #a5f3fc;
    --text-primary: #164e63;
    --text-secondary: #0891b2;
    --text-muted: #0e7490;
    --accent: #06b6d4;
    --accent-hover: #0891b2;
    --border: #a5f3fc;
    --shadow: rgba(6, 182, 212, 0.2);
  }

  /* Sunset Theme */
  .theme-sunset {
    --bg-primary: #fff7ed;
    --bg-secondary: #ffedd5;
    --bg-tertiary: #fed7aa;
    --text-primary: #9a3412;
    --text-secondary: #ea580c;
    --text-muted: #f97316;
    --accent: #fb923c;
    --accent-hover: #ea580c;
    --border: #fed7aa;
    --shadow: rgba(251, 146, 60, 0.2);
  }

  /* Forest Theme */
  .theme-forest {
    --bg-primary: #f0fdf4;
    --bg-secondary: #dcfce7;
    --bg-tertiary: #bbf7d0;
    --text-primary: #14532d;
    --text-secondary: #166534;
    --text-muted: #15803d;
    --accent: #22c55e;
    --accent-hover: #16a34a;
    --border: #bbf7d0;
    --shadow: rgba(34, 197, 94, 0.2);
  }

  /* Midnight Theme */
  .theme-midnight {
    --bg-primary: #020617;
    --bg-secondary: #0f172a;
    --bg-tertiary: #1e293b;
    --text-primary: #e2e8f0;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --accent: #818cf8;
    --accent-hover: #6366f1;
    --border: #1e293b;
    --shadow: rgba(129, 140, 248, 0.3);
  }

  /* Coffee Theme */
  .theme-coffee {
    --bg-primary: #fefce8;
    --bg-secondary: #fef3c7;
    --bg-tertiary: #fde68a;
    --text-primary: #78350f;
    --text-secondary: #92400e;
    --text-muted: #a16207;
    --accent: #d97706;
    --accent-hover: #b45309;
    --border: #fde68a;
    --shadow: rgba(217, 119, 6, 0.2);
  }

  /* Base styles using CSS variables */
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.3s ease;
  }

  .card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border);
    box-shadow: 0 4px 6px var(--shadow);
    transition: all 0.3s ease;
  }

  .button {
    background-color: var(--accent);
    color: white;
    border: none;
    transition: all 0.3s ease;
  }

  .button:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px var(--shadow);
  }

  .text-secondary {
    color: var(--text-secondary);
  }

  .text-muted {
    color: var(--text-muted);
  }

  .bg-tertiary {
    background-color: var(--bg-tertiary);
  }
`;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light'); // Removed localStorage for Claude.ai compatibility

  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'purple', 'ocean', 'sunset', 'forest', 'midnight', 'coffee'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    // Inject styles into document head
    let styleSheet = document.getElementById('theme-styles');
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'theme-styles';
      document.head.appendChild(styleSheet);
    }
    styleSheet.textContent = themeStyles;

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