import { create } from 'zustand';
export const useProjectStore=create(set=>({
  projects:[],
  setProjects:(projects:any[])=>set({projects})
}));