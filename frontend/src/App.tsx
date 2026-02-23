import { Layout } from './widgets/layout/Layout';
import { LayoutAside } from './widgets/layout/LayoutAside';
import { ProjectList } from './features/project/ui/ProjectList';
import { LayoutMain } from './widgets/layout/LayoutMain';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useRedux';
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
        <TasksMain />
      </LayoutMain>
    </Layout>
  );
}

export default App;
