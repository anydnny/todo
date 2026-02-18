export type TaskType = {
  id: string;
  title: string;
  status: 'complete' | 'new';
  createdAt: string;
  projectId: string;
  isTaskEdit: boolean;
};

export type TaskTypeProps = {
  taskInfo: TaskType;
};

export type TaskInitialState = {
  taskList: TaskType[];
  loading?: boolean;
  error?: string | null;
};
export type TaskContextType = {
  taskList: TaskType[];
  addTask: (newTask: TaskType) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};
