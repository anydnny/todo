import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  TASK_STATUS,
  type TaskInitialState,
  type TaskType,
} from '../../utils/taskTypes';
import { PROJECT_IDS } from '../../utils/projectTypes';
const initialState: TaskInitialState = {
  taskList: [],
};
interface TaskFormData {
  title: string;
  projectId: string;
}
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskFormData>) => {
      const createdTask: TaskType = {
        id: uuidv4(),
        title: action.payload.title,
        status: TASK_STATUS.NEW,
        createdAt: new Date().toISOString(),
        projectId: action.payload.projectId || PROJECT_IDS.NO_PROJECT,
        isTaskEdit: false,
      };

      state.taskList.push(createdTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        task => task.id !== action.payload
      );
    },
    completeTask: (state, action: PayloadAction<string>) => {
      function changeStatus(item: TaskType): TaskType {
        if (item.status === TASK_STATUS.COMPLETE) {
          return { ...item, status: TASK_STATUS.NEW };
        }
        return { ...item, status: TASK_STATUS.COMPLETE };
      }
      state.taskList = state.taskList.map(task =>
        task.id === action.payload ? changeStatus(task) : task
      );
    },
    changeProject: (
      state,
      action: PayloadAction<{ taskId: string; projectId: string }>
    ) => {
      state.taskList = state.taskList.map(task =>
        task.id === action.payload.taskId
          ? { ...task, projectId: action.payload.projectId }
          : task
      );
    },
    toggleTaskEdit: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.map(task =>
        task.id === action.payload
          ? { ...task, isTaskEdit: !task.isTaskEdit }
          : task
      );
    },
  },
});

export const {
  addTask,
  deleteTask,
  completeTask,
  changeProject,
  toggleTaskEdit,
} = taskSlice.actions;
export const reducer = taskSlice.reducer;
