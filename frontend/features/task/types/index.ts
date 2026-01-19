export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
}

export interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  clearError: () => void;

  getTasks: (projectId: string) => Promise<void>;
  createTask: (data: CreateTaskDto) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Promise<Task>;
}

export interface TaskCardProps {
  task: Task;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}
