import style from './ProjectForm.module.css';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';

import { createProject } from '../../store/slices/ProjectSlice';

export const ProjectForm: React.FC = () => {
  const [formValue, setFormValue] = useState('');
  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormValue(e.target.value);
  }

  function handleProjectCreate(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newProject = { name: formValue.trim() };
    if (formValue.trim() === '') {
      throw new Error('Task title cannot be empty');
    } else {
      dispatch(createProject(newProject));
      setFormValue('');
    }
  }
  return (
    <form onSubmit={handleProjectCreate} className={style.projectForm}>
      <input
        type="text"
        placeholder="New project..."
        value={formValue}
        onChange={handleInputChange}
        className={style.projectForm__input}
      />
      <button type="submit" className={style.projectForm__createButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33331 8H12.6666"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 3.33331V12.6666"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};
