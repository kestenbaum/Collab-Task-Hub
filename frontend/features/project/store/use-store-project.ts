import { create } from 'zustand';

import { projectServices } from '@/features/project/api/services/projectServices';
import type { Project } from '@/features/project/types';

export type ProjectStore = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  clearError: () => void;
  getProjects: () => Promise<void>;
  createProject: (data: { title: string; description?: string }) => Promise<void>;
};

export const useStoreProject = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  getProjects: async () => {
    try {
      set({ isLoading: true, error: null });

      const data = await projectServices.getProjects();

      set({
        projects: data,
        isLoading: false,
      });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to load projects',
      });
    }
  },

  createProject: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const created = await projectServices.createProject(data);

      set({
        projects: [created, ...get().projects],
        isLoading: false,
      });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to create project',
      });
    }
  },
}));
