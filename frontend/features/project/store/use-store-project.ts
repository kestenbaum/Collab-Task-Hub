import { create } from 'zustand';

import { projectServices } from '@/features/project/api/services/projectServices';
import { ProjectStore } from '@/features/project/types';

export const useStoreProject = create<ProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  getProjects: async () => {
    try {
      set({ isLoading: true, error: null });

      const data = await projectServices.getProjects();
      set({ projects: data, isLoading: false });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to load projects',
      });
      throw e;
    }
  },

  createProject: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const created = await projectServices.createProject(data);

      set({
        projects: [created, ...get().projects],
      });

      return created;
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to create project',
      });

      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  getProjectById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const project = await projectServices.getProjectById(id);
      set({ selectedProject: project });
      return project;
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Failed to load project' });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },
}));
