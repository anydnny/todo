import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { tasksApi } from '../api/tasksApi';
import { configureStore } from '@reduxjs/toolkit';
import {
  createTask,
  deleteById,
  getAll,
  reducer,
  toggleStatus,
} from './TaskSlice';
import type { TaskInitialState, TaskType } from '../types/taskTypes';

jest.mock('../api/tasksApi', () => ({
  tasksApi: {
    createTask: jest.fn(),
    deleteTaskById: jest.fn(),
    toggleStatus: jest.fn(),
    getAllTasks: jest.fn(),
  },
}));

const mockedTasksApi = tasksApi as jest.Mocked<typeof tasksApi>;
const preloadedInitialState: TaskInitialState = {
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
const createStore = () =>
  configureStore({
    reducer: { task: reducer },
    preloadedState: {
      task: preloadedInitialState,
    },
  });

beforeEach(() => jest.clearAllMocks());

const resolvedTask: TaskType = {
  id: 't3',
  title: 'Fake Task 3',
  status: 'new',
  projectId: 'p3',
  createdAt: '2026-01-01',
  isTaskEdit: false,
};

describe('TaskSlice Thunks', () => {
  describe('createTask', () => {
    it('fullfiled', async () => {
      const store = createStore();

      mockedTasksApi.createTask.mockResolvedValue(resolvedTask);

      await store.dispatch(
        createTask({ title: 'Fake Task 3', projectId: 'p3' })
      );
      const state = store.getState().task;

      expect(state.taskList).toHaveLength(3);
      expect(state.taskList[2]).toEqual(resolvedTask);
      expect(mockedTasksApi.createTask).toHaveBeenCalledWith({
        title: 'Fake Task 3',
        projectId: 'p3',
      });
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });
    it('rejected', async () => {
      const store = createStore();
      mockedTasksApi.createTask.mockRejectedValue(new Error('Create failed'));

      const result = await store.dispatch(
        createTask({ title: 'Broken', projectId: 'p1' })
      );
      const state = store.getState().task;

      expect(result.type).toBe('tasks/create/rejected');
      expect(state.error).toBe('Create failed');
      expect(state.loading).toBe(false);
    });
  });
  describe('deleteById', () => {
    it('fullfiled', async () => {
      const store = createStore();
      mockedTasksApi.deleteTaskById.mockResolvedValue('t1');
      await store.dispatch(deleteById('t1'));
      const state = store.getState().task;

      expect(mockedTasksApi.deleteTaskById).toHaveBeenCalledWith('t1');
      expect(state.taskList).toHaveLength(1);
      expect(state.taskList[0].id).toBe('t2');
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });
    it('rejected', async () => {
      const store = createStore();
      mockedTasksApi.deleteTaskById.mockRejectedValue(
        new Error('Delete failed')
      );

      const result = await store.dispatch(deleteById('t1'));
      const state = store.getState().task;

      expect(result.type).toBe('tasks/deleteById/rejected');
      expect(state.taskList).toHaveLength(2);
      expect(state.error).toBe('Delete failed');
      expect(state.loading).toBe(false);
    });
  });
  describe('getAll', () => {
    it('fullfiled', async () => {
      const store = createStore();
      mockedTasksApi.getAllTasks.mockResolvedValue(
        preloadedInitialState.taskList
      );
      const results = await store.dispatch(getAll());
      const state = store.getState().task;

      expect(mockedTasksApi.getAllTasks).toHaveBeenCalled();
      expect(state.taskList).toEqual(results.payload);
    });

    it('rejected', async () => {
      const store = createStore();
      mockedTasksApi.getAllTasks.mockRejectedValue(new Error('Load failed'));

      const result = await store.dispatch(getAll());
      const state = store.getState().task;

      expect(result.type).toBe('tasks/getAll/rejected');
      expect(state.error).toBe('Load failed');
      expect(state.loading).toBe(false);
    });
  });
  describe('toggleStatus', () => {
    it('fullfiled new -> complete', async () => {
      const store = createStore();
      mockedTasksApi.toggleStatus.mockResolvedValue('t1');
      await store.dispatch(toggleStatus('t1'));
      const state = store.getState().task;

      expect(mockedTasksApi.toggleStatus).toHaveBeenCalledWith('t1');
      expect(state.taskList[0].status).toBe('complete');
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('fullfiled complete -> new', async () => {
      const store = createStore();
      mockedTasksApi.toggleStatus.mockResolvedValue('t2');

      await store.dispatch(toggleStatus('t2'));
      const state = store.getState().task;

      expect(state.taskList[1].status).toBe('new');
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('rejected', async () => {
      const store = createStore();
      mockedTasksApi.toggleStatus.mockRejectedValue(new Error('Toggle failed'));

      const result = await store.dispatch(toggleStatus('t1'));
      const state = store.getState().task;

      expect(result.type).toBe('tasks/toggle/rejected');
      expect(state.taskList[0].status).toBe('new');
      expect(state.error).toBe('Toggle failed');
      expect(state.loading).toBe(false);
    });
  });
});
