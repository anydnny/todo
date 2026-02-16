import { useAppSelector } from '../../hooks/useRedux';
import { TASK_STATUS } from '../../utils/taskTypes';

export const TaskHeading = () => {
  const currentProjectId = useAppSelector(state => state.ui.currentProjectId);
  const project = useAppSelector(state =>
    state.project.projectList.find(project => project.id === currentProjectId)
  );
  const taskCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        task =>
          task.projectId === currentProjectId && task.status === TASK_STATUS.NEW
      ).length
  );
  return (
    <header className="taskHeader">
      <h2 className="taskHeader__title">{project?.name}</h2>
      <p className="taskHeader__subtitle">{taskCount} active tasks</p>
    </header>
  );
};
