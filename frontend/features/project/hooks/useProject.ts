import { useStoreProject } from '@/features/project/store/use-store-project';

export const useProjects = () => {
  const { projects, isLoading, error, getProjects, createProject, clearError } = useStoreProject();

  return { projects, isLoading, error, getProjects, createProject, clearError };
};
