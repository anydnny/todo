import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

type RepoMock = {
  find: jest.Mock;
  findOne: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  delete: jest.Mock;
};

describe('TasksService', () => {
  let service: TasksService;
  let repo: RepoMock;

  const repoMock: RepoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<RepoMock>(getRepositoryToken(Task));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll вызывает repo.find и возвращает задачи', async () => {
    const tasks = [{ id: 't1' }, { id: 't2' }] as Task[];
    repo.find.mockResolvedValue(tasks);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalledWith({});
    expect(result).toEqual(tasks);
  });

  it('createTask создает task с default полями и сохраняет его', async () => {
    const dto = { title: 'New task', projectId: 'p1' };
    const createdTask = {
      id: 't1',
      title: 'New task',
      status: 'new',
      isTaskEdit: false,
      projectId: 'p1',
    } as Task;

    repo.create.mockReturnValue(createdTask);
    repo.save.mockResolvedValue(createdTask);

    const result = await service.createTask(dto);

    expect(repo.create).toHaveBeenCalledWith({
      ...dto,
      status: 'new',
      isTaskEdit: false,
    });
    expect(repo.save).toHaveBeenCalledWith(createdTask);
    expect(result).toEqual(createdTask);
  });
  describe('toggleStatus', () => {
    it('toggleStatus меняет new -> complete', async () => {
      const task = { id: 't1', status: 'new' } as Task;
      const savedTask = { ...task, status: 'complete' } as Task;
      repo.findOne.mockResolvedValue(task);
      repo.save.mockResolvedValue(savedTask);

      const result = await service.toggleStatus('t1');

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 't1' } });
      expect(repo.save).toHaveBeenCalledWith({ ...task, status: 'complete' });
      expect(result.status).toBe('complete');
    });

    it('toggleStatus меняет complete -> new', async () => {
      const task = { id: 't1', status: 'complete' } as Task;
      const savedTask = { ...task, status: 'new' } as Task;
      repo.findOne.mockResolvedValue(task);
      repo.save.mockResolvedValue(savedTask);

      const result = await service.toggleStatus('t1');

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 't1' } });
      expect(repo.save).toHaveBeenCalledWith({ ...task, status: 'new' });
      expect(result.status).toBe('new');
    });

    it('toggleStatus бросает NotFoundException если не найдено', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.toggleStatus('missing')).rejects.toThrow(
        new NotFoundException('Task not found'),
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });
  describe('deleteTask', () => {
    it('deleteTask проходит если affected > 0', async () => {
      repo.delete.mockResolvedValue({ affected: 1 });

      await expect(service.deleteTask('t1')).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith('t1');
    });

    it('deleteTask бросает NotFoundException если affected === 0', async () => {
      repo.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteTask('missing')).rejects.toThrow(
        new NotFoundException('Task not found'),
      );
      expect(repo.delete).toHaveBeenCalledWith('missing');
    });
  });
});
