import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
type ProjectsServiceMock = {
  createProject: jest.Mock;
  findAll: jest.Mock;
  deleteProject: jest.Mock;
};

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsServiceMock;

  const projectsServiceMock: ProjectsServiceMock = {
    createProject: jest.fn(),
    findAll: jest.fn(),
    deleteProject: jest.fn(),
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
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: projectsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsServiceMock>(ProjectsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createProject -> вызывает service.createProject', async () => {
    service.createProject.mockResolvedValue(newProject);
    const result = await controller.createProject({ name: 'Fake Project 1' });

    expect(service.createProject).toHaveBeenCalledWith({
      name: 'Fake Project 1',
    });
    expect(result).toEqual(newProject);
  });

  it('findAll -> вызывает service.findAll', async () => {
    const projects = [newProject];
    service.findAll.mockResolvedValue(projects);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(projects);
  });

  it('deleteProject -> передает id в service.deleteProject', async () => {
    service.deleteProject.mockResolvedValue(undefined);

    const result = await controller.deleteProject(
      '550e8400-e29b-41d4-a716-446655440000',
    );

    expect(service.deleteProject).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
    );
    expect(result).toBeUndefined();
  });
});
