import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { projectsApi } from '../api/projectsApi';
import { configureStore } from '@reduxjs/toolkit';
import { createProject, deleteProject, getAll, reducer } from './ProjectSlice';
import { PROJECT_TYPE, type Project } from '../types/projectTypes';

jest.mock('../api/projectsApi', () => ({
  projectsApi: {
    createProject: jest.fn(),
    deleteProject: jest.fn(),
    getAllProjects: jest.fn(),
  },
}));

const mockedProjectsApi = projectsApi as jest.Mocked<typeof projectsApi>;

const createEmptyStore = () =>
  configureStore({ reducer: { project: reducer } });
const createStoreWithProjects = () =>
  configureStore({
    reducer: { project: reducer },
    preloadedState: {
      project: {
        projectList: [
          {
            id: 'p1',
            name: 'Fake Project 1',
            createdAt: '2026-01-01',
            projectListType: PROJECT_TYPE.CUSTOM,
          },
          {
            id: 'p2',
            name: 'Fake Project 2',
            createdAt: '2026-01-01',
            projectListType: PROJECT_TYPE.SYSTEM,
          },
        ],
      },
    },
  });

beforeEach(() => {
  jest.clearAllMocks();
});

const mockedProjectResult: Project = {
  id: 'p1',
  name: 'Fake Project',
  createdAt: '2026-01-01',
  projectListType: PROJECT_TYPE.CUSTOM,
};

describe('ProjectSlice Thunks', () => {
  it('createProject fullfiled', async () => {
    const store = createEmptyStore();

    mockedProjectsApi.createProject.mockResolvedValue(mockedProjectResult);

    await store.dispatch(createProject({ name: 'Fake Project' }));
    const state = store.getState().project;

    expect(state.projectList).toHaveLength(1);
    expect(state.projectList[0]).toEqual(mockedProjectResult);
    expect(mockedProjectsApi.createProject).toHaveBeenCalledWith({
      name: 'Fake Project',
    });
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('deleteProject fullfiled', async () => {
    const store = createStoreWithProjects();
    await store.dispatch(deleteProject('p1'));
    const state = store.getState().project;

    expect(mockedProjectsApi.deleteProject).toHaveBeenCalledWith('p1');
    expect(state.projectList).toHaveLength(1);
    expect(state.projectList[0].id).toBe('p2');
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('getAll fullfiled', async () => {
    const store = createStoreWithProjects();
    const results = await store.dispatch(getAll());
    const state = store.getState().project;

    expect(mockedProjectsApi.getAllProjects).toHaveBeenCalled();
    expect(state.projectList).toEqual(results.payload);
  });

  it('getAll rejected записывает ошибку', async () => {
    const store = createStoreWithProjects();
    mockedProjectsApi.getAllProjects.mockRejectedValue(
      new Error('Failed load from api')
    );

    const result = await store.dispatch(getAll());
    const state = store.getState().project;

    expect(result.type).toBe('projects/getAll/rejected');
    expect(state.error).toBe('Failed load from api');
    expect(state.loading).toBe(false);
  });

  it('createProject rejected записывает ошибку', async () => {
    const store = createEmptyStore();
    mockedProjectsApi.createProject.mockRejectedValue(new Error('Create failed'));

    const result = await store.dispatch(createProject({ name: 'Broken' }));
    const state = store.getState().project;

    expect(result.type).toBe('projects/create/rejected');
    expect(state.projectList).toHaveLength(0);
    expect(state.error).toBe('Create failed');
    expect(state.loading).toBe(false);
  });
});
