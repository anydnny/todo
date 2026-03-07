import { TaskForm } from '../../features/task/ui/TaskForm';
import { TaskHeading } from '../../features/task/ui/TaskHeading';
import { TaskList } from '../../features/task/ui/TaskList';

export const TasksMain = () => {
  return (
    <>
      <TaskHeading />
      <TaskForm />
      <TaskList />
    </>
  );
};
