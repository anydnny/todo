import { describe, it, expect } from '@jest/globals';
import {
  reducer,
  createTask,
  deleteById,
  toggleStatus,
} from './TaskSlice';
import type { TaskInitialState } from '../types/taskTypes';

describe('Task Reducer', () => {
  const initialState: TaskInitialState = {
    taskList: [
      {
        id: 't1',
        title: 'A',
        status: 'new',
        createdAt: '2026-01-01',
        projectId: 'p1',
        isTaskEdit: false,
      },
    ],
    loading: false,
    error: null,
  };

  it('createTask создаёт новую задачу', () => {
    const payload = {
      id: 't2',
      title: 'B',
      status: 'new' as const,
      createdAt: '2026-01-02',
      projectId: 'p2',
      isTaskEdit: false,
    };

    const action = createTask.fulfilled(payload, 'requestId', {
      title: 'B',
      projectId: 'p2',
    });
    const next = reducer(initialState, action);
    expect(next.taskList).toHaveLength(2);
    expect(next.taskList[1]).toEqual(payload);
  });
  it('deleteById удаляет задачу по id', () => {
    const action = deleteById.fulfilled('t1', 'requestId', 't1');
    const next = reducer(initialState, action);
    expect(next.taskList).toHaveLength(0);
    expect(next.taskList.find(task => task.id === 't1')).toBeUndefined();
  });
  it('toggleStatus меняет статус задачи', () => {
    const action = toggleStatus.fulfilled('t1', 'requestId', 't1');
    const next = reducer(initialState, action);
    expect(next.taskList[0].status).toBe('complete');
  });
});
