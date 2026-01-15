import { AxiosInstance } from 'axios';

import { CreateProjectDto, Project } from '@/features/project/types';
import { api } from '@/shared/api/axios';

class ProjectServices {
  private axios: AxiosInstance = api;

  public async getProjects(): Promise<Project[]> {
    try {
      const response = await this.axios.get<Project[]>('/projects/all');
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async createProject(data: CreateProjectDto): Promise<Project> {
    try {
      const response = await this.axios.post<Project>('/projects', data);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  public async getProjectById(id: string): Promise<Project> {
    try {
      const response = await this.axios.get<Project>(`/projects/${id}`);
      return response.data;
    } catch (e: unknown) {
      throw e instanceof Error ? e : new Error(String(e));
    }
  }
}

export const projectServices = new ProjectServices();
