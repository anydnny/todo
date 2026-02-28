import { beforeEach, describe, jest, it, expect } from '@jest/globals';
import { clientApi } from '../../../api/clientApi';
import { PROJECT_TYPE, type Project } from '../types/projectTypes';
import { projectsApi } from './projectsApi';

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

describe('Project API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createProject вызывает clientApi.post', async () => {
    const resolvedProject: Project = {
      id: 'p1',
      name: 'Fake Project 1',
      createdAt: '2026-01-01',
      projectListType: PROJECT_TYPE.CUSTOM,
    };

    mockedClientApi.post.mockResolvedValue(resolvedProject);

    const result = await projectsApi.createProject({ name: 'Fake Project 1' });

    expect(mockedClientApi.post).toHaveBeenCalledWith(
      'projects',
      { name: 'Fake Project 1' },
      'Ошибка при создании проекта'
    );
    expect(result).toEqual(resolvedProject);
  });

  it('deleteProject вызывает clientApi.delete', async () => {
    mockedClientApi.delete.mockResolvedValue(undefined);

    await projectsApi.deleteProject('p2');

    expect(mockedClientApi.delete).toHaveBeenCalledWith(
      'projects',
      { id: 'p2' },
      'Ошибка при удалении проекта'
    );
  });

  it('getAll выщывает clientApi.get', async () => {
    const resolvedProjects: Project[] = [
      {
        id: 'p1',
        name: 'Fake Project 1',
        createdAt: '2026-01-01',
        projectListType: PROJECT_TYPE.CUSTOM,
      },
      {
        id: 'p2',
        name: 'Fake Project 2',
        createdAt: '2026-02-01',
        projectListType: PROJECT_TYPE.SYSTEM,
      },
    ];

    mockedClientApi.get.mockResolvedValue(resolvedProjects);

    const result = projectsApi.getAllProjects();

    expect(mockedClientApi.get).toHaveBeenCalledWith(
      'projects',
      'Ошибка при получении проектов'
    );
    await expect(result).resolves.toEqual(resolvedProjects);
  });
});
