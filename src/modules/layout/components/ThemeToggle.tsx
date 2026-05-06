'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { THEME_STORAGE_KEY } from '@/lib/constants';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-white/80 hover:text-white hover:bg-white/10"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
