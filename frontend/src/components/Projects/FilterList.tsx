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

  function handleActiveClick(projectId: string) {
    const selected = projectList.find(item => item.id === projectId);
    if (!selected) {
      return;
    }

    dispatch(setUiProperty(projectId));
    dispatch(
      setUiTaskProjectSelect({
        id: selected.id,
        title: selected.name,
      })
    );
  }

  return (
    <ul className={style.sidesection__list} aria-label={`Список проектов`}>
      {projectList.map(item => (
        <li
          key={item.id}
          className={style.sidesection__item}
          aria-label={`Элемент списка проектов"`}
        >
          <button
            className={clsx(
              style['sidesection__button'],
              selectedProject === item.id && style['sidesection__button-active']
            )}
            onClick={() => handleActiveClick(item.id)}
            type="button"
            aria-current={selectedProject === item.id ? 'page' : undefined}
            aria-label={`Проект ` + `"${item.name}"`}
            aria-description={`Открыть проект ` + `"${item.name}"`}
            aria-describedby={`project-count-${item.id}`}
          >
            <span className={style.sidesection__itemText}>{item.name}</span>
            <Counter projectId={item.id} srId={`project-count-${item.id}`} />
          </button>
        </li>
      ))}
    </ul>
  );
};
