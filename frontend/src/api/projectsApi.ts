import type { Project } from '../utils/projectTypes';
import { clientApi } from './clientApi';

interface CreateProjectPayload {
  name: string;
}

export const projectsApi = {
  createProject: (payload: CreateProjectPayload): Promise<Project> =>
    clientApi.post<Project, CreateProjectPayload>(
      'projects',
      payload,
      'Ошибка при создании проекта'
    ),
  getAllProjects: (): Promise<Project[]> =>
    clientApi.get<Project[]>('projects', 'Ошибка при получении проектов'),
  deleteProject: (projectId: string): Promise<void> =>
    clientApi.delete<void, { id: string }>(
      'projects',
      { id: projectId },
      'Ошибка при удалении проекта'
    ),
};
