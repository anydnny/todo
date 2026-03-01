import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { createTask } from '../model/TaskSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import style from './TaskForm.module.css';
import clsx from 'clsx';
import { ProjectsDropdown } from '../../project/ui/ProjectsDropdown';
import { setUiTaskProjectSelect } from '../../ui/model/UiSlice';

interface TaskFormData {
  title: string;
}
export const TaskForm: React.FC = () => {
  const taskProject = useAppSelector(state => state.ui.createTaskProjectSelect);
  const projectsList = useAppSelector(state => state.project.projectList);
  const [formValue, setFormValue] = useState<TaskFormData>({
    title: '',
  });
  const taskTitleInputId = 'task-title-input';

  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setFormValue({ title: e.target.value });
  }

  async function handleTaskCreate(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const title = formValue.title.trim();

    if (!title || !taskProject.id) {
      return;
    }

    try {
      await dispatch(
        createTask({
          title,
          projectId: taskProject.id,
        })
      ).unwrap();
      setFormValue({ title: '' });
    } catch (error) {
      console.error('Error creating task', error);
    }
  }

  const buttonStyle = clsx(
    style['taskForm__button'],
    (formValue.title.trim() === '' || !taskProject.id) &&
      style['taskForm__button--disabled']
  );

  return (
    <form onSubmit={handleTaskCreate} className={style.taskForm}>
      <label htmlFor={taskTitleInputId} className="visually-hidden">
        Название новой задачи
      </label>
      <input
        id={taskTitleInputId}
        type="text"
        placeholder="What needs to be done?"
        value={formValue.title}
        onChange={handleInputChange}
        className={style.taskForm__input}
      />
      <div className={style.taskForm__footer}>
        <ProjectsDropdown
          projectsList={projectsList}
          currentProjectId={taskProject.id}
          onSelect={project =>
            dispatch(
              setUiTaskProjectSelect({
                id: project.id,
                title: project.name,
              })
            )
          }
        />

        <span>{taskProject.title || 'Select project'}</span>
        <button
          type="submit"
          className={buttonStyle}
          disabled={formValue.title.trim() === '' || !taskProject.id}
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
