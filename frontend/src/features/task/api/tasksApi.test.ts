import { beforeEach, describe, jest, it, expect } from '@jest/globals';
import { clientApi } from '../../../api/clientApi';
import { tasksApi } from './tasksApi';
import { type TaskType } from '../types/taskTypes';

jest.mock('../../../api/clientApi', () => ({
  clientApi: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
  },
}));

const mockedClientApi = clientApi as jest.Mocked<typeof clientApi>;

describe('Task API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const resolvedTask: TaskType = {
    id: 't1',
    title: 'Fake Task 1',
    status: 'new',
    projectId: 'p1',
    createdAt: '2026-01-01',
    isTaskEdit: false,
  };
  it('createTask вызывает clientApi.post', async () => {
    mockedClientApi.post.mockResolvedValue(resolvedTask);

    const result = await tasksApi.createTask({
      title: 'Fake Task 1',
      projectId: 'p1',
    });

    expect(mockedClientApi.post).toHaveBeenCalledWith(
      'tasks',
      {
        title: 'Fake Task 1',
        projectId: 'p1',
      },
      'Ошибка создания задачи'
    );
    expect(result).toEqual(resolvedTask);
  });

  it('deleteTaskById вызывает clientApi.delete', async () => {
    mockedClientApi.delete.mockResolvedValue(undefined);

    await tasksApi.deleteTaskById('t1');

    expect(mockedClientApi.delete).toHaveBeenCalledWith(
      'tasks/t1',
      undefined,
      'Ошибка при удалении задачи'
    );
  });

  it('getAllTasks выщывает clientApi.get', async () => {
    const resolverTasks: TaskType[] = [resolvedTask];

    mockedClientApi.get.mockResolvedValue(resolverTasks);

    const result = tasksApi.getAllTasks();

    expect(mockedClientApi.get).toHaveBeenCalledWith(
      'tasks',
      'Ошибка при получении задач'
    );
    await expect(result).resolves.toEqual(resolverTasks);
  });
  it('toggleStatus вызывает clientApi.patch', async () => {
    mockedClientApi.patch.mockResolvedValue(undefined);
    const result = await tasksApi.toggleStatus('t1');
    expect(mockedClientApi.patch).toHaveBeenCalledWith(
      'tasks/t1/status',
      undefined,
      'Ошибка при изменении статуса задачи'
    );
    expect(result).toEqual('t1');
  });

  it('changeTaskProject вызывает clientApi.patch с projectId', async () => {
    const changedTask = { ...resolvedTask, projectId: 'p2' };
    mockedClientApi.patch.mockResolvedValue(changedTask);

    const result = await tasksApi.changeTaskProject('t1', { projectId: 'p2' });

    expect(mockedClientApi.patch).toHaveBeenCalledWith(
      'tasks/t1/project',
      { projectId: 'p2' },
      'Ошибка при смене проекта у задачи'
    );
    expect(result).toEqual(changedTask);
  });
});
