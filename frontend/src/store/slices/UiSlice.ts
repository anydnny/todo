import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { taskProjectSelect, UiInitialState } from '../../utils/uiTypes';

const initialState: UiInitialState = {
  currentProjectId: 'inbox',
  createTaskProjectSelect: {
    id: 'inbox',
    title: 'Inbox',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUiProperty: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.currentProjectId = action.payload;
      } else {
        state.currentProjectId = null;
      }
    },
    setUiTaskProjectSelect: (
      state,
      action: PayloadAction<taskProjectSelect | null>
    ) => {
      if (action.payload) {
        state.createTaskProjectSelect.id = action.payload.id;
        state.createTaskProjectSelect.title = action.payload.title;
      }
    },
  },
});

export const { setUiProperty, setUiTaskProjectSelect } = uiSlice.actions;
export const reducer = uiSlice.reducer;
