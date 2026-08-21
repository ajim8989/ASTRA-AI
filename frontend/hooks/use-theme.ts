import { useState } from 'react';
export function useTheme(){
  const [theme,setTheme]=useState<'light'|'dark'>('dark');
  return {theme,setTheme};
}