import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { createTask } from '../../store/slices/TaskSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import style from './TaskForm.module.css';
import clsx from 'clsx';
import { ProjectsDropdown } from '../shared/ui/ProjectsDropdown';
import { tasksApi } from '../../api/tasksApi';

interface TaskFormData {
  title: string;
}
export const TaskForm: React.FC = () => {
  const taskProject = useAppSelector(state => state.ui.createTaskProjectSelect);
  const [formValue, setFormValue] = useState<TaskFormData>({
    title: '',
  });

  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormValue({ ...formValue, title: e.target.value });
  }

  const currentProject = useAppSelector(state => state.ui.currentProjectId);

  async function handleTaskCreate(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (formValue.title.trim() === '') {
      throw new Error('Task title cannot be empty');
    } else {
      try {
        const newTask = await tasksApi.createTask({
          title: formValue.title.trim(),
          projectId: taskProject.id,
        });
        dispatch(createTask(newTask));
        setFormValue({ ...formValue, title: '' });
      } catch (error) {
        console.error('Error creating', error);
      }
    }
  }

  const buttonStyle = clsx(
    style['taskForm__button'],
    formValue.title.trim() === '' && style['taskForm__button--disabled']
  );

  return (
    <form onSubmit={handleTaskCreate} className={style.taskForm}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={formValue.title}
        onChange={handleInputChange}
        className={style.taskForm__input}
      />
      <div className={style.taskForm__footer}>
        <ProjectsDropdown />
        <span>
          <span>{taskProject.title}</span>
        </span>
        <button
          type="submit"
          className={buttonStyle}
          disabled={formValue.title.trim() === ''}
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
              stroke="white"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 3.33331V12.6666"
              stroke="white"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Add</span>
        </button>
      </div>
    </form>
  );
};
