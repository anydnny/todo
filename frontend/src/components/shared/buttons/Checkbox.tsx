import { useAppDispatch } from '../../../hooks/useRedux';
import { toggleStatus } from '../../../store/slices/TaskSlice';
import style from './Checkbox.module.css';
import clsx from 'clsx';

interface Props {
  checked: boolean;
  taskId: string;
  labelledBy: string;
}

export const Checkbox: React.FC<Props> = ({ taskId, checked, labelledBy }) => {
  const dispatch = useAppDispatch();

  return (
    <label className="complete-checkbox">
      <input
        type="checkbox"
        className={clsx(style['visually-hidden'])}
        onChange={() => dispatch(toggleStatus(taskId))}
        checked={checked || false}
        aria-labelledby={labelledBy}
      />
      {checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      ) : (
        <span></span>
      )}
    </label>
  );
};
