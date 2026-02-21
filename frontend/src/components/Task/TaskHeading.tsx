import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DeleteButton } from '../shared/buttons/DeleteButton';
import { deleteProject } from '../../store/slices/ProjectSlice';
import {
  setUiProperty,
  setUiTaskProjectSelect,
} from '../../store/slices/UiSlice';
import { PROJECT_TYPE } from '../../utils/projectTypes';
import style from './TaskHeading.module.css';

export const TaskHeading = () => {
  const dispatch = useAppDispatch();

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
      dispatch(setUiProperty(''));
      dispatch(setUiTaskProjectSelect({ id: '', title: '' }));
      return;
    }

    dispatch(setUiProperty(fallbackProject.id));
    dispatch(
      setUiTaskProjectSelect({
        id: fallbackProject.id,
        title: fallbackProject.name,
      })
    );
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
          <DeleteButton deleteFn={() => deleteProjectFn(currentProjectId)} />
        )}
      </div>
    </header>
  );
};
