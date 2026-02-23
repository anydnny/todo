import { configureStore } from '@reduxjs/toolkit';
import { reducer as tasksReducer } from '../features/task/model/TaskSlice';
import { reducer as projectsReducer } from '../features/project/model/ProjectSlice';
import { reducer as uiReducer } from '../features/ui/model/UiSlice';

export const store = configureStore({
  reducer: {
    task: tasksReducer,
    project: projectsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
