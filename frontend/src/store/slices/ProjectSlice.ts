import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  type ProjectInitialState,
  type Project,
  PROJECT_TYPE,
  type ProjectCreate,
} from '../../utils/projectTypes';
import { projectsApi } from '../../api/projectsApi';

const initialState: ProjectInitialState = {
  projectList: [],
  loading: false,
  error: null,
};

export const getAll = createAsyncThunk<Project[]>(
  'projects/getAll',
  async () => {
    const projects = await projectsApi.getAllProjects();
    return projects;
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectInfo: ProjectCreate) => {
    const project = await projectsApi.createProject(projectInfo);
    return project;
  }
);

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
  extraReducers: builder => {
    builder
      .addCase(getAll.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load projects';
      })
      .addCase(createProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create projects';
      });
  },
});

export const { addProject, deleteProject, changeProjectName } =
  projectSlice.actions;
export const reducer = projectSlice.reducer;
