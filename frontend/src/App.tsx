import { Layout } from './components/Layout/Layout';
import { LayoutAside } from './components/Layout/LayoutAside';
import { ProjectList } from './components/Projects/ProjectList';
import { TaskForm } from './components/Task/TaskForm';
import { TaskHeading } from './components/Task/TaskHeading';
import { TaskList } from './components/Task/TaskList';
import { LayoutMain } from './components/Layout/LayoutMain';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useRedux';
import { getAll } from './store/slices/TaskSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
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
