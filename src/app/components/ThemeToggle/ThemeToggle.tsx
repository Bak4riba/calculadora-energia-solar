'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    console.log('🎯 Mudando tema para:', newIsDark ? 'dark' : 'light');
    
    const html = document.documentElement;
    
    // Remove primeiro, depois adiciona (evita conflito)
    html.classList.remove('dark');
    if (newIsDark) {
      html.classList.add('dark');
      console.log('✅ dark class ADDED');
    } else {
      console.log('✅ dark class REMOVED');
    }
    
    // Força um re-render
    setTimeout(() => {
      setIsDark(newIsDark);
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    }, 10);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('💾 Tema salvo:', savedTheme);
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-yellow-500'}`}>
        {isDark ? '🌙' : '☀️'}
      </span>
      <button 
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-300 ${
          isDark 
            ? 'bg-gray-700 text-white border-gray-600' 
            : 'bg-gray-200 text-gray-800 border-gray-300'
        } border hover:opacity-80`}
      >
        {isDark ? 'Escuro' : 'Claro'}
      </button>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {isDark ? 'Ativo' : 'Ativo'}
      </span>
    </div>
  );
}