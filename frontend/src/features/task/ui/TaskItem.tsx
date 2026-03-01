import style from './TaskItem.module.css';
import type { TaskTypeProps } from '../types/taskTypes';
import { changeProject, deleteById } from '../model/TaskSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { DeleteButton } from '../../../shared/ui/DeleteButton';
import { Checkbox } from './Checkbox';
import { ProjectsDropdown } from '../../project/ui/ProjectsDropdown';

export const TaskItem: React.FC<TaskTypeProps> = ({ taskInfo }) => {
  const dispatch = useAppDispatch();
  const projectsList = useAppSelector(state => state.project.projectList);
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
        <ProjectsDropdown
          projectsList={projectsList}
          currentProjectId={taskInfo.projectId}
          onSelect={project =>
            dispatch(
              changeProject({ taskId: taskInfo.id, projectId: project.id })
            )
          }
          buttonAriaLabel={`Выбор проекта для задачи ${taskInfo.title}`}
        />
        <DeleteButton
          deleteFn={() => dispatch(deleteById(taskInfo.id))}
          ariaActionText={`Удалить задачу ${taskInfo.title}`}
        />
      </div>
    </article>
  );
};
