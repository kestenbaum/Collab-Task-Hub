export interface Project {
  id: string;
  title: string;
  description: string;
}

export interface ProjectCardProps {
  project: Project;
  isAuth: boolean;
  onJoin?: (id: string) => void;
}

export interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  getProjects: () => Promise<void>;
  createProject: (data: { title: string; description: string }) => Promise<void>;
  clearError: () => void;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
}
