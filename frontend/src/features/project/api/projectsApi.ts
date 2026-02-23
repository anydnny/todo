import type { Project } from '../types/projectTypes';
import { clientApi } from '../../../api/clientApi';

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
