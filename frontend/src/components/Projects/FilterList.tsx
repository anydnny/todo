import style from './FilterList.module.css';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { PROJECT_TYPE } from '../../utils/projectTypes';
import {
  setUiProperty,
  setUiTaskProjectSelect,
} from '../../store/slices/UiSlice';
import { Counter } from '../shared/ui/Counter';

interface FilterListProps {
  type: PROJECT_TYPE;
}
export const FilterList: React.FC<FilterListProps> = ({
  type = PROJECT_TYPE.CUSTOM,
}) => {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(state => state.project.projectList).filter(
    item => item.projectListType === type
  );
  const selectedProject = useAppSelector(state => state.ui.currentProjectId);

  function handleActiveClick(index: string) {
    dispatch(setUiProperty(index));
    dispatch(
      setUiTaskProjectSelect({
        id: index,
        title: projectList.filter(item => item.id === index)[0].name,
      })
    );
  }

  return (
    <ul className={style.sidesection__list}>
      {projectList.map(item => (
        <li
          key={item.id}
          className={clsx(
            style['sidesection__item'],
            selectedProject === item.id && style['sidesection__item-active']
          )}
          onClick={() => handleActiveClick(item.id)}
        >
          <span className={style.sidesection__itemText}>{item.name}</span>
          <Counter projectId={item.id} />
        </li>
      ))}
    </ul>
  );
};
