import { create } from 'zustand';

import { mockProjects } from '@/features/project/mocks/projects.mock';
import { Project } from '@/features/project/types';
import { ProjectStore } from '@/features/project/types';

export const useStoreProject = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  getProjects: async () => {
    try {
      set({ isLoading: true, error: null });

      await new Promise((r) => setTimeout(r, 600));
      set({ projects: mockProjects, isLoading: false });

      // const data = await projectServices.getProjects();
      // set({ projects: data, isLoading: false });
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

      // const created = await projectServices.createProject(data);
      // set({ projects: [created, ...get().projects], isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to create project',
      });
    }
  },
}));
