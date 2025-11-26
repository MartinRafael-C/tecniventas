// theme/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Theme {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  error: string;
  success: string;
}

export const lightTheme: Theme = {
  background: '#f9fafb',
  surface: '#ffffff',
  primary: '#667eea',
  secondary: '#764ba2',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  card: '#ffffff',
  error: '#ef4444',
  success: '#10b981',
};

export const darkTheme: Theme = {
  background: '#111827',
  surface: '#1f2937',
  primary: '#818cf8',
  secondary: '#a78bfa',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  border: '#374151',
  card: '#1f2937',
  error: '#f87171',
  success: '#34d399',
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};