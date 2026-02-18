import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAll } from '../../store/slices/TaskSlice';
import { TaskListSection } from './TaskListSection';

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const currentProject = useAppSelector(state => state.ui.currentProjectId);
  const taskList = useAppSelector(state =>
    state.task.taskList.filter(item => item.projectId === currentProject)
  );

  return (
    <>
      <TaskListSection
        title="active"
        taskList={taskList.filter(item => item.status === 'new')}
      />
      <TaskListSection
        title="archive"
        taskList={taskList.filter(item => item.status === 'complete')}
      />
    </>
  );
};
