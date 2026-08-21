import { create } from 'zustand';
export const useSettingsStore=create(set=>({
  theme:'dark',
  language:'en',
  setTheme:(theme:string)=>set({theme}),
  setLanguage:(language:string)=>set({language})
}));