import { useAppSelector } from '../../hooks/useRedux';

export const TaskHeading = () => {
  const currentProjectId = useAppSelector(state => state.ui.currentProjectId);

  const project = useAppSelector(state =>
    state.project.projectList.find(p => p.id === currentProjectId)
  );

  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        t => t.projectId === currentProjectId && t.status === 'new'
      ).length
  );

  return (
    <header className="taskHeader">
      <h2 className="taskHeader__title">{project?.name}</h2>
      <p className="taskHeader__subtitle">{tasksCount} active tasks</p>
    </header>
  );
};
