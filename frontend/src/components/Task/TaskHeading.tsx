import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DeleteButton } from '../shared/buttons/DeleteButton';
import { deleteProject } from '../../store/slices/ProjectSlice';
import {
  setUiProperty,
  setUiTaskProjectSelect,
} from '../../store/slices/UiSlice';
import style from './TaskHeading.module.css';

export const TaskHeading = () => {
  const dispatch = useAppDispatch();

  const currentProjectId = useAppSelector(state => state.ui.currentProjectId);

  const project = useAppSelector(state =>
    state.project.projectList.find(p => p.id === currentProjectId)
  );

  const tasksCount = useAppSelector(
    state =>
      state.task.taskList.filter(
        t => t.projectId === currentProjectId && t.status === 'new'
      ).length
  );

  const deleteProjectFn = (projectId: string) => {
    dispatch(deleteProject(projectId)).then(() => {
      dispatch(setUiProperty('d406e045-29e0-4ae3-a8b9-aed2622cb328'));
      dispatch(
        setUiTaskProjectSelect({
          id: 'd406e045-29e0-4ae3-a8b9-aed2622cb328',
          title: 'Inbox',
        })
      );
    });
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
