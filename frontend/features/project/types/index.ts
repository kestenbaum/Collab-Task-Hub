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
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  hasLoadedProject: boolean;

  getProjects: () => Promise<void>;
  getProjectById: (id: string) => Promise<Project>;
  createProject: (data: CreateProjectDto) => Promise<Project>;
  clearError: () => void;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
}
