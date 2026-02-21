import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { taskProjectSelect, UiInitialState } from '../../utils/uiTypes';

const initialState: UiInitialState = {
  currentProjectId: '',
  createTaskProjectSelect: {
    id: '',
    title: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUiProperty: (state, action: PayloadAction<string>) => {
      state.currentProjectId = action.payload;
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
