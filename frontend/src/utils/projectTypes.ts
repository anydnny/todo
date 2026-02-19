import type { TaskType } from './taskTypes';

export type Project = {
  id: PROJECT_IDS | string;
  name: string;
  createdAt: string;
  projectListType: PROJECT_TYPE;
};

export type ProjectInitialState = {
  projectList: Project[];
  taskInfo?: TaskType;
  loading?: boolean;
  error?: string | null;
};

export type ProjectCreate = {
  name: string;
};
export type ProjectListProps = {
  projectListType: PROJECT_TYPE;
};

export enum PROJECT_IDS {
  NO_PROJECT = 'no_project',
}

export enum PROJECT_TYPE {
  SYSTEM = 'system',
  CUSTOM = 'custom',
}
export const systemProject_NO_PROJECT: Project = {
  id: PROJECT_IDS.NO_PROJECT,
  name: 'Без проекта',
  createdAt: new Date().toISOString(),
  projectListType: PROJECT_TYPE.SYSTEM,
};
