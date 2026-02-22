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
  const hasHeading = taskList.length > 0;
  const sectionHeadingId = `task-list-section-${title}`;

  return (
    <section
      className={style.taskListSection}
      aria-labelledby={hasHeading ? sectionHeadingId : undefined}
      aria-label={!hasHeading ? `${title} tasks` : undefined}
    >
      {title === 'active' && taskList.length === 0 && <NoTaskMessage />}
      {hasHeading && (
        <h2
          id={sectionHeadingId}
          className={clsx(style['taskList__title'], 'text-lg')}
        >
          {title}
        </h2>
      )}
      {hasHeading && (
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
