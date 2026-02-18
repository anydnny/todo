import { TaskItem } from './TaskItem';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { NoTaskMessage } from './NoTaskMessage';
import style from './TaskList.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';
import { getAll } from '../../store/slices/TaskSlice';

interface TaskListProps {
  type: 'new' | 'completed';
  title?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ type, title }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const currentProject = useAppSelector(state => state.ui.currentProjectId);
  const taskList = useAppSelector(state =>
    state.task.taskList.filter(item => item.projectId === currentProject)
  );
  const filteredTaskList = taskList.filter(item => {
    if (type === 'new') {
      return item.status === 'new';
    } else {
      return item.status === 'complete';
    }
  });

  return (
    <section className={style.taskListSection}>
      {type !== 'completed' && filteredTaskList.length === 0 && (
        <NoTaskMessage />
      )}
      {title && filteredTaskList.length > 0 && (
        <h2 className={clsx(style['taskList__title'], 'text-lg')}>{title}</h2>
      )}
      {filteredTaskList.length > 0 && (
        <ul className={style.taskList}>
          {filteredTaskList.map((taskInfo, index) => (
            <li>
              <TaskItem key={index} taskInfo={taskInfo} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
