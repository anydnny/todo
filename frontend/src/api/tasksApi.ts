import type { TaskType } from '../utils/taskTypes';
import { clientApi } from './clientApi';

interface CreateTaskPayload {
  title: string;
  projectId: string;
}

export const tasksApi = {
  createTask: (payload: CreateTaskPayload): Promise<TaskType> =>
    clientApi.post<TaskType, CreateTaskPayload>(
      'tasks',
      payload,
      'Ошибка создания задачи'
    ),
  getAllTasks: (): Promise<TaskType[]> =>
    clientApi.get<TaskType[]>('tasks', 'Ошибка при получении задач'),
  deleteTaskById: async (taskId: string): Promise<string> => {
    await clientApi.delete<void>(
      `tasks/${taskId}/delete`,
      undefined,
      'Ошибка при удалении задачи'
    );
    return taskId;
  },
  toggleStatus: async (taskId: string): Promise<string> => {
    await clientApi.patch<void>(
      `tasks/${taskId}/status`,
      undefined,
      'Ошибка при изменении статуса задачи'
    );
    return taskId;
  },
};
