import type { TaskType } from '../types/taskTypes';
import { clientApi } from '../../../api/clientApi';

interface CreateTaskPayload {
  title: string;
  projectId: string;
}

interface ChangeTaskProjectPayload {
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
      `tasks/${taskId}`,
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
  changeTaskProject: (
    taskId: string,
    payload: ChangeTaskProjectPayload
  ): Promise<TaskType> =>
    clientApi.patch<TaskType, ChangeTaskProjectPayload>(
      `tasks/${taskId}/project`,
      payload,
      'Ошибка при смене проекта у задачи'
    ),
};
