import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

type TasksServiceMock = {
  findAll: jest.Mock;
  createTask: jest.Mock;
  toggleStatus: jest.Mock;
  deleteTask: jest.Mock;
  changeProject: jest.Mock;
};

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksServiceMock;

  const tasksServiceMock: TasksServiceMock = {
    findAll: jest.fn(),
    createTask: jest.fn(),
    toggleStatus: jest.fn(),
    deleteTask: jest.fn(),
    changeProject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: tasksServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksServiceMock>(TasksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllTasks вызывает service.findAll', async () => {
    const tasks = [{ id: 't1' }];
    service.findAll.mockResolvedValue(tasks);

    const result = await controller.findAllTasks();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('create передает dto в service.createTask', async () => {
    const dto = { title: 'New task', projectId: 'p1' };
    const task = { id: 't1', ...dto };
    service.createTask.mockResolvedValue(task);

    const result = await controller.create(dto);

    expect(service.createTask).toHaveBeenCalledWith(dto);
    expect(result).toEqual(task);
  });

  it('toggleStatus передает id в service.toggleStatus', async () => {
    const toggledTask = { id: 't1', status: 'complete' };
    service.toggleStatus.mockResolvedValue(toggledTask);

    const result = await controller.toggleStatus(
      '550e8400-e29b-41d4-a716-446655440001',
    );

    expect(service.toggleStatus).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440001',
    );
    expect(result).toEqual(toggledTask);
  });

  it('remove передает id в service.deleteTask', async () => {
    service.deleteTask.mockResolvedValue(undefined);

    const result = await controller.remove(
      '550e8400-e29b-41d4-a716-446655440002',
    );

    expect(service.deleteTask).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440002',
    );
    expect(result).toBeUndefined();
  });

  it('changeProject передает id и dto в service.changeProject', async () => {
    const changedTask = { id: 't1', projectId: 'p2' };
    const dto = { projectId: '550e8400-e29b-41d4-a716-446655440099' };
    service.changeProject.mockResolvedValue(changedTask);

    const result = await controller.changeProject(
      '550e8400-e29b-41d4-a716-446655440001',
      dto,
    );

    expect(service.changeProject).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440001',
      dto,
    );
    expect(result).toEqual(changedTask);
  });
});
