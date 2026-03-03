import type { ProjectInitialState } from '../types/projectTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { changeTaskProject, toggleTaskEdit } from '../../task/model/TaskSlice';
import { PROJECT_IDS } from '../types/projectTypes';

export const ProjectSelectInput: React.FC<ProjectInitialState> = ({
  taskInfo,
}) => {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(store => store.project.projectList);

  if (!taskInfo?.id) {
    return null;
  }
  const taskId = taskInfo.id;

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    if (projectId) {
      dispatch(changeTaskProject({ projectId, taskId }));
      dispatch(toggleTaskEdit(taskId));
    }
  };
  return (
    <select onChange={handleProjectChange} value={taskInfo.projectId}>
      <option value={PROJECT_IDS.NO_PROJECT}>Без проекта</option>
      {projectList.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
