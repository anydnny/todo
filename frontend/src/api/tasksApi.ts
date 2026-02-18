import { CreateTaskDto } from '../../../backend/src/tasks/dto/task.dto';

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
  getAllTasks: async () => {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get tasks');
    }
  },
};
