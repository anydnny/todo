import { CreateProjectDto } from '../../../backend/src/projects/dto/create-project.dto';
import type { Project } from '../utils/projectTypes';

const API_URL = 'http://localhost:3000/projects';

export const projectsApi = {
  createProject: async (dto: CreateProjectDto): Promise<Project> => {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    return response.json() as Promise<Project>;
  },
  getAllProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get projects');
    }
    return response.json() as Promise<Project[]>;
  },
};
