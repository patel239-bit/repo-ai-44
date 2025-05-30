
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const customThemes = [
    { value: 'midnight', label: 'Midnight', color: 'bg-slate-900' },
    { value: 'forest', label: 'Forest', color: 'bg-green-900' },
    { value: 'ocean', label: 'Ocean', color: 'bg-blue-900' },
    { value: 'sunset', label: 'Sunset', color: 'bg-orange-900' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-900' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span>Theme</span>
        </DropdownMenuLabel>
        
        {/* Standard themes */}
        {themeOptions.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => setTheme(option.value as any)}
            className={`hover:bg-accent ${theme === option.value ? 'bg-accent/50' : ''}`}
          >
            <option.icon className="mr-2 h-4 w-4" />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Custom Themes
        </DropdownMenuLabel>
        
        {/* Custom themes */}
        {customThemes.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => setTheme(option.value as any)}
            className={`hover:bg-accent ${theme === option.value ? 'bg-accent/50' : ''}`}
          >
            <div className={`mr-2 h-4 w-4 rounded-full ${option.color}`} />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
