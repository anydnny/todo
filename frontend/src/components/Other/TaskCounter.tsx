import style from './TaskCounter.module.css';
import { useAppSelector } from '../../hooks/useRedux';

export const TaskCounter: React.FC<{ projectId: string }> = ({ projectId }) => {
  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        item => item.projectId === projectId && item.status === 'new'
      ).length
  );

  return (
    <div className={style.counter}>
      <span>{tasksCount}</span>
    </div>
  );
};
