import { useStoreProject } from '@/features/project/store/use-store-project';

export const useProjects = () => {
  const projects = useStoreProject((s) => s.projects);
  const isLoading = useStoreProject((s) => s.isLoading);
  const error = useStoreProject((s) => s.error);

  const getProjects = useStoreProject((s) => s.getProjects);
  const createProject = useStoreProject((s) => s.createProject);
  const clearError = useStoreProject((s) => s.clearError);

  return {
    projects,
    isLoading,
    error,
    getProjects,
    createProject,
    clearError,
  };
};
