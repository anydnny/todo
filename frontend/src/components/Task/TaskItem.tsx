import style from './TaskItem.module.css';
import type { TaskTypeProps } from '../../utils/taskTypes';
import { deleteTask } from '../../store/slices/TaskSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { DeleteButton } from '../Other/DeleteButton';
import { CompleteButton } from '../Other/CompleteButton';
import { TASK_STATUS } from '../../utils/taskTypes';
export const TaskItem: React.FC<TaskTypeProps> = ({ taskInfo }) => {
  const dispatch = useAppDispatch();

  return (
    <article className={style.taskItem}>
      <CompleteButton
        taskId={taskInfo.id}
        checked={taskInfo.status === TASK_STATUS.COMPLETE}
      />
      <p>{taskInfo.title}</p>
      <div className={style.toolbox}>
        <DeleteButton deleteFn={() => dispatch(deleteTask(taskInfo.id))} />
      </div>
    </article>
  );
};
