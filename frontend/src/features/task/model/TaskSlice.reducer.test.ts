import { describe, it, expect } from '@jest/globals';
import type { TaskInitialState, TaskType } from '../types/taskTypes';
import {
  changeTaskProject,
  createTask,
  deleteById,
  getAll,
  reducer,
  toggleStatus,
} from './TaskSlice';

describe('Task Reducer', () => {
  const initialState: TaskInitialState = {
    taskList: [
      {
        id: 't1',
        title: 'Fake Task 1',
        status: 'new',
        projectId: 'p1',
        createdAt: '2026-01-01',
        isTaskEdit: false,
      },
      {
        id: 't2',
        title: 'Fake Task 2',
        status: 'complete',
        projectId: 'p2',
        createdAt: '2026-01-01',
        isTaskEdit: false,
      },
    ],
    loading: false,
    error: null,
  };

  const resolvedTask: TaskType = {
    id: 't3',
    title: 'Fake Task 3',
    status: 'new',
    projectId: 'p3',
    createdAt: '2026-01-01',
    isTaskEdit: false,
  };

  it('createTask создаёт задачу', () => {
    const action = createTask.fulfilled(resolvedTask, 'requestId', {
      title: 'Fake Task 3',
      projectId: 'p3',
    });
    const next = reducer(initialState, action);

    expect(next.taskList).toHaveLength(3);
    expect(next.taskList[2]).toEqual(resolvedTask);
  });

  it('deleteById удаляет задачу по id', () => {
    const action = deleteById.fulfilled('t1', 'requestId', 't1');
    const next = reducer(initialState, action);
    expect(next.taskList).toHaveLength(1);
    expect(next.taskList.find(p => p.id === 't1')).toBeUndefined();
  });

  it('toggleStatus меняет статус задачи', () => {
    const action = toggleStatus.fulfilled('t1', 'requestId', 't1');
    const next = reducer(initialState, action);

    expect(next.taskList[0].status).toBe('complete');
  });

  it('getAll загружает все задачи', () => {
    const action = getAll.fulfilled(initialState.taskList, 'requestId');
    const next = reducer(initialState, action);
    expect(next.taskList).toEqual(initialState.taskList);
  });

  it('changeTaskProject обновляет задачу из ответа API', () => {
    const changedTask = {
      ...initialState.taskList[0],
      projectId: 'p2',
    };
    const action = changeTaskProject.fulfilled(changedTask, 'requestId', {
      taskId: 't1',
      projectId: 'p2',
    });
    const next = reducer(initialState, action);

    expect(next.taskList[0].projectId).toBe('p2');
  });
});
