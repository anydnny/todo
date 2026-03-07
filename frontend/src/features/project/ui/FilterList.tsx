import style from './FilterList.module.css';
import clsx from 'clsx';
import { useAppSelector } from '../../../hooks/useRedux';
import { PROJECT_TYPE } from '../types/projectTypes';
import { Counter } from './Counter';
import { useNavigate, useParams } from 'react-router-dom';

interface FilterListProps {
  type: PROJECT_TYPE;
}
export const FilterList: React.FC<FilterListProps> = ({
  type = PROJECT_TYPE.CUSTOM,
}) => {
  const navigate = useNavigate();
  const { projectId: selectedProject } = useParams<{ projectId: string }>();
  const projectList = useAppSelector(state => state.project.projectList).filter(
    item => item.projectListType === type
  );

  function handleActiveClick(projectId: string) {
    navigate(`/projects/${projectId}`);
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
