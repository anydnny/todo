import style from './TaskItem.module.css';
import type { TaskTypeProps } from '../../utils/taskTypes';
import { deleteById } from '../../store/slices/TaskSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { DeleteButton } from '../shared/buttons/DeleteButton';
import { Checkbox } from '../shared/buttons/Checkbox';
export const TaskItem: React.FC<TaskTypeProps> = ({ taskInfo }) => {
  const dispatch = useAppDispatch();
  const taskTitleId = `task-title-${taskInfo.id}`;

  return (
    <article className={style.taskItem}>
      <Checkbox
        taskId={taskInfo.id}
        checked={taskInfo.status === 'complete'}
        labelledBy={taskTitleId}
      />
      <p id={taskTitleId}>{taskInfo.title}</p>
      <div className={style.toolbox}>
        <DeleteButton
          deleteFn={() => dispatch(deleteById(taskInfo.id))}
          ariaActionText={`Удалить задачу ${taskInfo.title}`}
        />
      </div>
    </article>
  );
};
