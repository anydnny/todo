import { Layout } from './widgets/layout/Layout';
import { LayoutAside } from './widgets/layout/LayoutAside';
import { ProjectList } from './features/project/ui/ProjectList';
import { LayoutMain } from './widgets/layout/LayoutMain';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { getAll as getAllTasks } from './features/task/model/TaskSlice';
import { getAll as getAllProjects } from './features/project/model/ProjectSlice';
import {
  setUiProperty,
  setUiTaskProjectSelect,
} from './features/ui/model/UiSlice';
import {
  PROJECT_TYPE,
  type Project,
} from './features/project/types/projectTypes';
import { TasksMain } from './widgets/tasks/TasksMain';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { PopupHost } from './features/ui/ui/PopupHost';

const getDefaultProject = (projects: Project[]) =>
  projects.find(project => project.name.trim().toLowerCase() === 'inbox') ??
  projects.find(project => project.projectListType === PROJECT_TYPE.SYSTEM) ??
  projects[0];

const ProjectWorkspace = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useAppSelector(state => state.project.projectList);
  const defaultProject = useMemo(() => getDefaultProject(projects), [projects]);

  useEffect(() => {
    dispatch(getAllTasks());
    void dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length === 0) {
      return;
    }

    const selectedProject = projectId
      ? projects.find(project => project.id === projectId)
      : null;

    if (!selectedProject) {
      if (defaultProject && projectId !== defaultProject.id) {
        navigate(`/projects/${defaultProject.id}`, { replace: true });
      }
      return;
    }

    dispatch(setUiProperty(selectedProject.id));
    dispatch(
      setUiTaskProjectSelect({
        id: selectedProject.id,
        title: selectedProject.name,
      })
    );
  }, [projects, projectId, defaultProject, navigate, dispatch]);

  return (
    <Layout>
      <LayoutAside>
        <ProjectList title="projects" />
      </LayoutAside>
      <LayoutMain>
        <TasksMain />
      </LayoutMain>
      <PopupHost />
    </Layout>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />
      <Route path="/projects" element={<ProjectWorkspace />} />
      <Route path="/projects/:projectId" element={<ProjectWorkspace />} />
      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  );
}

export default App;
