export type TaskType = {
  id: string;
  title: string;
  status: TASK_STATUS;
  createdAt: string;
  projectId: string;
  isTaskEdit: boolean;
};

export type TaskTypeProps = {
  taskInfo: TaskType;
};

export type TaskInitialState = {
  taskList: TaskType[];
};
export type TaskContextType = {
  taskList: TaskType[];
  addTask: (newTask: TaskType) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

export enum TASK_STATUS {
  COMPLETE = 'complete',
  DELETED = 'deleted',
  NEW = 'new',
}
