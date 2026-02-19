import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  type ProjectInitialState,
  type Project,
  PROJECT_TYPE,
} from '../../utils/projectTypes';

const initialState: ProjectInitialState = {
  projectList: [
    {
      id: 'inbox',
      name: 'Inbox',
      createdAt: new Date().toISOString(),
      projectListType: PROJECT_TYPE.SYSTEM,
    },
    {
      id: 'custom',
      name: 'Делишки',
      createdAt: new Date().toISOString(),
      projectListType: PROJECT_TYPE.CUSTOM,
    },
  ],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<string>) => {
      const createdProject: Project = {
        id: uuidv4(),
        name: action.payload,
        createdAt: new Date().toISOString(),
        projectListType: PROJECT_TYPE.CUSTOM,
      };

      state.projectList.push(createdProject);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projectList = state.projectList.filter(
        project => project.id !== action.payload
      );
    },
    changeProjectName: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      state.projectList = state.projectList.map(project =>
        project.id === action.payload.id
          ? { ...project, name: action.payload.newName }
          : project
      );
    },
  },
});

export const { addProject, deleteProject, changeProjectName } =
  projectSlice.actions;
export const reducer = projectSlice.reducer;
