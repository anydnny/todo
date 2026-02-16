import { configureStore } from '@reduxjs/toolkit';
import { reducer as tasksReducer } from './slices/TaskSlice';
import { reducer as projectsReducer } from './slices/ProjectSlice';
import { reducer as uiReducer } from './slices/UiSlice';

export const store = configureStore({
  reducer: {
    task: tasksReducer,
    project: projectsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
