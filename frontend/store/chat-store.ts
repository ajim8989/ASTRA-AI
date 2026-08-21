import { create } from 'zustand';
export const useChatStore=create(set=>({
  messages:[],
  addMessage:(m:any)=>set((s:any)=>({messages:[...s.messages,m]})),
  clear:()=>set({messages:[]})
}));