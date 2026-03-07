import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { DeleteButton } from '../../../shared/ui/DeleteButton';
import { deleteProject } from '../../project/model/ProjectSlice';
import { PROJECT_TYPE } from '../../project/types/projectTypes';
import style from './TaskHeading.module.css';
import { useNavigate } from 'react-router-dom';

export const TaskHeading = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentProjectId = useAppSelector(state => state.ui.currentProjectId);
  const projectList = useAppSelector(state => state.project.projectList);

  const project = useAppSelector(state =>
    state.project.projectList.find(p => p.id === currentProjectId)
  );

  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        t => t.projectId === currentProjectId && t.status === 'new'
      ).length
  );

  const deleteProjectFn = async (projectId: string) => {
    const fallbackProject =
      projectList.find(
        p => p.id !== projectId && p.projectListType === PROJECT_TYPE.SYSTEM
      ) ?? projectList.find(p => p.id !== projectId);

    const resultAction = await dispatch(deleteProject(projectId));
    if (!deleteProject.fulfilled.match(resultAction)) {
      return;
    }

    if (!fallbackProject) {
      navigate('/projects', { replace: true });
      return;
    }

    navigate(`/projects/${fallbackProject.id}`, { replace: true });
  };

  if (!project) {
    return null;
  }

  return (
    <header>
      <h2 className={style.taskHeader__title}>{project?.name}</h2>
      <div className={style.taskHeader__footer}>
        <p>{tasksCount} active tasks</p>
        {project?.projectListType === 'custom' && (
          <DeleteButton
            deleteFn={() => deleteProjectFn(currentProjectId)}
            ariaActionText={`Удалить проект ${project?.name} и все его задачи`}
          />
        )}
      </div>
    </header>
  );
};
