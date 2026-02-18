import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { type TaskInitialState, type TaskType } from '../../utils/taskTypes';
import { tasksApi } from '../../api/tasksApi';

const initialState: TaskInitialState = {
  taskList: [],
  loading: false,
  error: null,
};
interface TaskFormData {
  title: string;
  projectId: string;
}

export const getAll = createAsyncThunk<TaskType[]>('tasks/getAll', async () => {
  const tasks = await tasksApi.getAllTasks();
  return tasks;
});

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskInfo: TaskFormData) => {
    const task = await tasksApi.createTask(taskInfo);
    return task;
  }
);
export const deleteById = createAsyncThunk<string, string>(
  'tasks/deleteById',
  async (taskId: string) => {
    const id = await tasksApi.deleteTaskById(taskId);
    return id;
  }
);
export const toggleStatus = createAsyncThunk<string, string>(
  'tasks/toggle',
  async (taskId: string) => {
    const id = await tasksApi.toggleStatus(taskId);
    return id;
  }
);
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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
  extraReducers: builder => {
    builder
      .addCase(createTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;

        state.taskList.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create tasks';
      })
      .addCase(getAll.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load tasks';
      })
      .addCase(deleteById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = state.taskList.filter(
          task => task.id !== action.payload
        );
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete tasks';
      })
      .addCase(toggleStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.loading = false;
        function changeStatus(item: TaskType): TaskType {
          if (item.status === 'complete') {
            return { ...item, status: 'new' };
          }
          return { ...item, status: 'complete' };
        }
        state.taskList = state.taskList.map(task =>
          task.id === action.payload ? changeStatus(task) : task
        );
      })
      .addCase(toggleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to change status';
      });
  },
});

export const { changeProject, toggleTaskEdit } = taskSlice.actions;
export const reducer = taskSlice.reducer;
