import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { taskProjectSelect, UiInitialState } from '../../utils/uiTypes';

const initialState: UiInitialState = {
  currentProjectId: 'd406e045-29e0-4ae3-a8b9-aed2622cb328',
  createTaskProjectSelect: {
    id: 'd406e045-29e0-4ae3-a8b9-aed2622cb328',
    title: 'Inbox',
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
