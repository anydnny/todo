import style from './TaskCounter.module.css';
import { useAppSelector } from '../../hooks/useRedux';
import { TASK_STATUS } from '../../utils/taskTypes';

export const TaskCounter: React.FC<{ projectId: string }> = ({ projectId }) => {
  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        item => item.projectId === projectId && item.status === TASK_STATUS.NEW
      ).length
  );

  return (
    <div className={style.counter}>
      <span>{tasksCount}</span>
    </div>
  );
};
