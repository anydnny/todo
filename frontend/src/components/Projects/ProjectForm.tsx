import style from './ProjectForm.module.css';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';

import { createProject } from '../../store/slices/ProjectSlice';

export const ProjectForm: React.FC = () => {
  const [formValue, setFormValue] = useState('');
  const dispatch = useAppDispatch();
  const projectNameInputId = 'project-name-input';
  const trimmedValue = formValue.trim();
  const isCreateDisabled = trimmedValue === '';

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormValue(e.target.value);
  }

  function handleProjectCreate(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isCreateDisabled) return;

    dispatch(createProject({ name: trimmedValue }));
    setFormValue('');
  }
  return (
    <form onSubmit={handleProjectCreate} className={style.projectForm}>
      <label htmlFor={projectNameInputId} className={style.visuallyHidden}>
        Название нового проекта
      </label>
      <input
        id={projectNameInputId}
        type="text"
        placeholder="New project..."
        value={formValue}
        onChange={handleInputChange}
        className={style.projectForm__input}
      />
      <button
        type="submit"
        className={style.projectForm__createButton}
        disabled={isCreateDisabled}
        aria-label="Создать проект"
      >
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
