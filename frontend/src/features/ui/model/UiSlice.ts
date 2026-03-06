import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  PopupItem,
  taskProjectSelect,
  UiInitialState,
} from '../types/uiTypes';

const initialState: UiInitialState = {
  currentProjectId: '',
  createTaskProjectSelect: {
    id: '',
    title: '',
  },
  popups: [],
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
    pushPopup: (state, action: PayloadAction<PopupItem>) => {
      state.popups.push(action.payload);
    },
    removePopup: (state, action: PayloadAction<string>) => {
      state.popups = state.popups.filter(popup => popup.id !== action.payload);
    },
  },
});

export const { setUiProperty, setUiTaskProjectSelect, pushPopup, removePopup } =
  uiSlice.actions;
export const reducer = uiSlice.reducer;
