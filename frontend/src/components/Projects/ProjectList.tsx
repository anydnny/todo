import style from './ProjectList.module.css';
import { PROJECT_TYPE } from '../../utils/projectTypes';

import { FilterList } from './FilterList';
import { ProjectForm } from './ProjectForm';

interface ProjectListProps {
  title: string;
}
export const ProjectList: React.FC<ProjectListProps> = ({ title }) => {
  return (
    <section className={style.sidesection}>
      {title && <h3 className={style.sidesection__title}>{title}</h3>}
      <FilterList type={PROJECT_TYPE.SYSTEM} />
      <FilterList type={PROJECT_TYPE.CUSTOM} />
      <ProjectForm />
    </section>
  );
};
