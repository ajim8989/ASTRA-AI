import { create } from 'zustand';
export const useNotificationStore=create(set=>({
  notifications:[],
  add:(n:any)=>set((s:any)=>({notifications:[...s.notifications,n]})),
  clear:()=>set({notifications:[]})
}));