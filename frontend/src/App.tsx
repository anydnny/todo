import { Layout } from './components/Layout/Layout';
import { LayoutAside } from './components/Layout/LayoutAside';
import { ProjectList } from './components/Projects/ProjectList';
import { TaskForm } from './components/Task/TaskForm';
import { TaskHeading } from './components/Task/TaskHeading';
import { TaskList } from './components/Task/TaskList';
import { LayoutMain } from './components/Layout/LayoutMain';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useRedux';
import { getAll as getAllTasks } from './store/slices/TaskSlice';
import { getAll as getAllProjects } from './store/slices/ProjectSlice';
import { setUiProperty, setUiTaskProjectSelect } from './store/slices/UiSlice';
import { PROJECT_TYPE, type Project } from './utils/projectTypes';

const getDefaultProject = (projects: Project[]) =>
  projects.find(project => project.projectListType === PROJECT_TYPE.SYSTEM) ??
  projects[0];

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      dispatch(getAllTasks());

      const projectsAction = await dispatch(getAllProjects());
      if (!getAllProjects.fulfilled.match(projectsAction)) {
        return;
      }

      const defaultProject = getDefaultProject(projectsAction.payload);
      if (!defaultProject) {
        return;
      }

      dispatch(setUiProperty(defaultProject.id));
      dispatch(
        setUiTaskProjectSelect({
          id: defaultProject.id,
          title: defaultProject.name,
        })
      );
    };

    void initialize();
  }, [dispatch]);

  return (
    <Layout>
      <LayoutAside>
        <ProjectList title="projects" />
      </LayoutAside>
      <LayoutMain>
        <TaskHeading />
        <TaskForm />
        <TaskList />
      </LayoutMain>
    </Layout>
  );
}

export default App;
