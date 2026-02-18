import { TaskItem } from './TaskItem';
import { NoTaskMessage } from './NoTaskMessage';
import style from './TaskListSection.module.css';
import clsx from 'clsx';
import type { TaskType } from '../../utils/taskTypes';
interface TaskListSectionProps {
  title: 'active' | 'archive';
  taskList: TaskType[];
}

export const TaskListSection: React.FC<TaskListSectionProps> = ({
  title,
  taskList,
}) => {
  return (
    <section className={style.taskListSection}>
      {title === 'active' && taskList.length === 0 && <NoTaskMessage />}
      {taskList.length > 0 && (
        <h2 className={clsx(style['taskList__title'], 'text-lg')}>{title}</h2>
      )}
      {taskList.length > 0 && (
        <ul className={style.taskList}>
          {taskList.map((taskInfo, index) => (
            <li key={index}>
              <TaskItem taskInfo={taskInfo} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
