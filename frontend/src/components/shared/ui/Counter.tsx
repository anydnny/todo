import style from './Counter.module.css';
import { useAppSelector } from '../../../hooks/useRedux';

export const Counter: React.FC<{ projectId: string; srId: string }> = ({
  projectId,
  srId,
}) => {
  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        item => item.projectId === projectId && item.status === 'new'
      ).length
  );

  return (
    <div className={style.counter}>
      <span aria-hidden="true">{tasksCount}</span>
      <span id={srId} className={style['visually-hidden']}>
        {tasksCount} active tasks
      </span>
    </div>
  );
};
