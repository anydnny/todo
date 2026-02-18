import { CreateTaskDto } from '../../../backend/src/tasks/dto/task.dto';
import type { TaskType } from '../utils/taskTypes';

const API_URL = 'http://localhost:3000/tasks';

export const tasksApi = {
  createTask: async (dto: CreateTaskDto) => {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  },
  getAllTasks: async (): Promise<TaskType[]> => {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get tasks');
    }
    return response.json() as Promise<TaskType[]>;
  },
  deleteTaskById: async (taskId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/${taskId}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get tasks');
    }
    return taskId;
  },
  toggleStatus: async (taskId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get tasks');
    }
    return taskId;
  },
};
