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
    <label className={style.checkboxLabel}>
      <input
        type="checkbox"
        className="visually-hidden"
        onChange={() => dispatch(toggleStatus(taskId))}
        checked={checked || false}
        aria-labelledby={labelledBy}
      />
      <span
        className={clsx(
          style.checkboxControl,
          checked && style.checkboxControlChecked
        )}
        aria-hidden="true"
      >
        {checked && (
          <svg
            className={style.checkboxIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        )}
      </span>
    </label>
  );
};
