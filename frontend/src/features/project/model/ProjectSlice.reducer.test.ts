import { type ProjectInitialState, PROJECT_TYPE } from '../types/projectTypes';
import {
  createProject,
  deleteProject,
  changeProjectName,
  reducer,
} from './ProjectSlice';
import { describe, it, expect } from '@jest/globals';

describe('Project Reducer', () => {
  const initialState: ProjectInitialState = {
    projectList: [
      {
        id: 'p1',
        name: 'Test Project 1',
        createdAt: '2026-01-01',
        projectListType: PROJECT_TYPE.CUSTOM,
      },
      {
        id: 'p2',
        name: 'Test Project 2',
        createdAt: '2026-01-01',
        projectListType: PROJECT_TYPE.SYSTEM,
      },
    ],
    loading: false,
  };

  it('createProject создаёт проект', () => {
    const payload = {
      id: 'p3',
      name: 'Test Project 3',
      createdAt: '2026-01-01',
      projectListType: PROJECT_TYPE.CUSTOM,
    };
    const action = createProject.fulfilled(payload, 'requestId', {
      name: payload.name,
    });
    const next = reducer(initialState, action);
    expect(next.projectList).toHaveLength(3);
    expect(next.projectList[2]).toEqual(payload);
  });

  it('deleteProject удаляет custom проект', () => {
    const action = deleteProject.fulfilled('p1', 'requestId', 'p1');
    const next = reducer(initialState, action);
    expect(next.projectList).toHaveLength(1);
    expect(next.projectList.find(p => p.id === 'p1')).toBeUndefined();
  });
  it('deleteProject не удаляет system проект', () => {
    const action = deleteProject.rejected(
      new Error('Cannot delete system project'),
      'requestId',
      'p2'
    );
    const next = reducer(initialState, action);
    expect(next.projectList).toHaveLength(2);
    expect(next.projectList.find(p => p.id === 'p2')).toBeDefined();
  });

  it('changeProjectName меняет имя проекта', () => {
    const action = changeProjectName({ id: 'p1', newName: 'Renamed Project' });
    const next = reducer(initialState, action);

    expect(next.projectList.find(p => p.id === 'p1')?.name).toBe(
      'Renamed Project'
    );
  });

  it('removeProject удаляет проект по id', () => {
    const action = { type: 'projects/removeProject', payload: 'p1' };
    const next = reducer(initialState, action);

    expect(next.projectList).toHaveLength(1);
    expect(next.projectList[0].id).toBe('p2');
  });

  it('getAll.rejected сбрасывает loading', () => {
    const action = { type: 'projects/getAll/rejected', error: {} };
    const next = reducer({ ...initialState, loading: true }, action);

    expect(next.loading).toBe(false);
  });

  it('createProject.rejected сбрасывает loading', () => {
    const action = { type: 'projects/create/rejected', error: {} };
    const next = reducer({ ...initialState, loading: true }, action);

    expect(next.loading).toBe(false);
  });

  it('deleteProject.rejected сбрасывает loading', () => {
    const action = { type: 'projects/delete/rejected', error: {} };
    const next = reducer({ ...initialState, loading: true }, action);

    expect(next.loading).toBe(false);
  });
});
