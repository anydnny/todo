import { Layout } from './components/Layout/Layout';
import { LayoutAside } from './components/Layout/LayoutAside';
import { ProjectList } from './components/Projects/ProjectList';
import { TaskForm } from './components/Task/TaskForm';
import { TaskHeading } from './components/Task/TaskHeading';
import { TaskList } from './components/Task/TaskList';
import { LayoutMain } from './components/Layout/LayoutMain';

function App() {
  return (
    <Layout>
      <LayoutAside>
        <ProjectList title="projects" />
      </LayoutAside>
      <LayoutMain>
        <TaskHeading />
        <TaskForm />
        <TaskList type="new" title="active" />
        <TaskList type="completed" title="archive" />
      </LayoutMain>
    </Layout>
  );
}

export default App;
