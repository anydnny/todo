import { useRef, useState } from 'react';
import style from './ProjectsDropdown.module.css';
import useClickOutside from '../../../hooks/useClickOutside';
import { useAppSelector } from '../../../hooks/useRedux';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setUiTaskProjectSelect } from '../../../store/slices/UiSlice';

export const ProjectsDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const projectsList = useAppSelector(state => state.project.projectList);

  function toggleUiProperty() {
    if (open) {
      setOpen(false);
    }
  }
  function clickMenuItem(id: string) {
    const selectedProject = projectsList.find(item => item.id === id);
    if (!selectedProject) {
      return;
    }

    dispatch(
      setUiTaskProjectSelect({
        id: selectedProject.id,
        title: selectedProject.name,
      })
    );
    setOpen(false);
  }

  useClickOutside([buttonRef, listRef], toggleUiProperty, open);

  return (
    <div className={style.projectSelectPopup}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-controls="dropdown-menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={style.projectSelect__button}
        ref={buttonRef}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.66667 13.3333H13.3333C13.687 13.3333 14.0261 13.1929 14.2761 12.9428C14.5262 12.6928 14.6667 12.3536 14.6667 12V5.33333C14.6667 4.97971 14.5262 4.64057 14.2761 4.39052C14.0261 4.14048 13.687 4 13.3333 4H8.04667C7.82706 3.99886 7.61113 3.9435 7.41807 3.83883C7.22501 3.73415 7.06079 3.58341 6.94 3.4L6.39334 2.6C6.27255 2.41659 6.10833 2.26585 5.91527 2.16117C5.72221 2.0565 5.50628 2.00114 5.28667 2H2.66667C2.31305 2 1.97391 2.14048 1.72386 2.39052C1.47381 2.64057 1.33334 2.97971 1.33334 3.33333V12C1.33334 12.7333 1.93334 13.3333 2.66667 13.3333Z"
            stroke="#333333"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.33334 6.66666V9.33332"
            stroke="#333333"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 6.66666V7.99999"
            stroke="#333333"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.6667 6.66666V10.6667"
            stroke="#333333"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul id="dropdown-menu" role="menu" ref={listRef}>
          {projectsList.map(item => (
            <li key={item.id}>
              <button
                role="menuitem"
                type="button"
                onClick={() => clickMenuItem(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
