import { SYSTEM_PROJECTS_REGISTRY } from '../../../modules/projects/constants/system-projects.registry';

export const projectsSeedData = [
  ...SYSTEM_PROJECTS_REGISTRY.map((project) => ({
    ...project,
    projectListType: 'system' as const,
  })),
];
