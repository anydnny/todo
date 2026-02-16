import type { ProjectInitialState } from '../../utils/projectTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { changeProject, toggleTaskEdit } from '../../store/slices/TaskSlice';
import { PROJECT_IDS } from '../../utils/projectTypes';

export const ProjectSelectInput: React.FC<ProjectInitialState> = ({
  taskInfo,
}) => {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(store => store.project.projectList);

  if (!taskInfo?.id) {
    console.log('no id');
    return;
  }
  const taskId = taskInfo.id;

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    if (projectId) {
      dispatch(changeProject({ projectId, taskId }));
      dispatch(toggleTaskEdit(taskId));
    }
  };
  return (
    <select onChange={handleProjectChange}>
      <option value={PROJECT_IDS.NO_PROJECT}>Без проекта</option>
      {projectList.map(item => (
        <option
          key={item.id}
          value={item.id}
          selected={taskInfo.projectId === item.id ? true : false}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};
