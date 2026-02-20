import style from './TaskItem.module.css';
import type { TaskTypeProps } from '../../utils/taskTypes';
import { deleteById } from '../../store/slices/TaskSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { DeleteButton } from '../shared/buttons/DeleteButton';
import { Checkbox } from '../shared/buttons/Checkbox';
export const TaskItem: React.FC<TaskTypeProps> = ({ taskInfo }) => {
  const dispatch = useAppDispatch();

  return (
    <article className={style.taskItem}>
      <Checkbox taskId={taskInfo.id} checked={taskInfo.status === 'complete'} />
      <p>{taskInfo.title}</p>
      <div className={style.toolbox}>
        <DeleteButton deleteFn={() => dispatch(deleteById(taskInfo.id))} />
      </div>
    </article>
  );
};
