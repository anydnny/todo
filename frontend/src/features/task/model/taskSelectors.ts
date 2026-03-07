import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';

export const selectAllTasks = createSelector(
  (state: RootState) => state.task.taskList,
  taskList => taskList
);
