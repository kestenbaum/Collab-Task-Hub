import { create } from 'zustand';

import { taskServices } from '@/features/task/api/services/taskServices';
import type { TaskStore } from '@/features/task/types';

export const useStoreTask = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  getTasks: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await taskServices.getTasksByProject(projectId);
      set({ tasks: data });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to load tasks',
      });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  createTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const created = await taskServices.createTask(data);
      set({ tasks: [created, ...get().tasks] });
      return created;
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to create task',
      });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await taskServices.deleteTask(id);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to delete task',
      });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  getTaskById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const task = await taskServices.getTaskById(id);
      return task;
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Failed to load task' });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },
}));
