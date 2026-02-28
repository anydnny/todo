import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

describe('ProjectsService', () => {
  type RepoMock = {
    save: jest.Mock;
    findOne: jest.Mock;
    find: jest.Mock;
    delete: jest.Mock;
  };
  let service: ProjectsService;
  let repo: RepoMock;
  const repoMock: RepoMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };
  const newProject: Project = {
    id: 'p1',
    name: 'Fake Project 1',
    createdAt: new Date('2026-01-01'),
    projectListType: 'custom',
    tasks: [],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get<RepoMock>(getRepositoryToken(Project));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createProject -> repo.save', async () => {
    repo.save.mockResolvedValue(newProject);

    const result = await service.createProject({ name: 'Fake Project 1' });

    expect(repo.save).toHaveBeenCalledWith({ name: 'Fake Project 1' });
    expect(result).toEqual(newProject);
  });

  it('findAll -> repo.find', async () => {
    repo.find.mockResolvedValue([newProject]);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalledWith({});
    expect(result).toEqual([newProject]);
  });

  describe('deleteProject', () => {
    it('deleteProject -> ошибка при пустом projectId', async () => {
      await expect(service.deleteProject('')).rejects.toThrow(
        BadRequestException,
      );
      expect(repo.findOne).not.toHaveBeenCalled();
    });
    it('deleteProject -> ошибка при не найденом проекте', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.deleteProject('p1')).rejects.toThrow(
        'Project not found',
      );
      expect(repo.delete).not.toHaveBeenCalled();
    });
    it('deleteProject -> ошибка при удалении системного проекта', async () => {
      repo.findOne.mockResolvedValue({
        ...newProject,
        projectListType: 'system',
      });
      await expect(service.deleteProject('p1')).rejects.toThrow(
        'Cannot delete system project',
      );
      expect(repo.delete).not.toHaveBeenCalled();
    });
    it('deleteProject -> удаляет кастомный проект', async () => {
      repo.findOne.mockResolvedValue(newProject);
      repo.delete.mockResolvedValue({ affected: 1 } as DeleteResult);
      const result = await service.deleteProject('p1');
      expect(repo.delete).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });
});
