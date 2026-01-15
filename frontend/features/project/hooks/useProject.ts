import { useStoreProject } from '@/features/project/store/use-store-project';

export const useProjects = () => {
  const projects = useStoreProject((s) => s.projects);
  const selectedProject = useStoreProject((s) => s.selectedProject);
  const isLoading = useStoreProject((s) => s.isLoading);
  const error = useStoreProject((s) => s.error);

  const getProjects = useStoreProject((s) => s.getProjects);
  const getProjectById = useStoreProject((s) => s.getProjectById);
  const createProject = useStoreProject((s) => s.createProject);
  const clearError = useStoreProject((s) => s.clearError);

  return {
    projects,
    selectedProject,
    isLoading,
    error,
    getProjects,
    getProjectById,
    createProject,
    clearError,
  };
};
