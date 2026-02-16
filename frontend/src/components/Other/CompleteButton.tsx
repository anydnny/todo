import { useAppDispatch } from '../../hooks/useRedux';
import { completeTask } from '../../store/slices/TaskSlice';
import style from './CompleteButton.module.css';
import clsx from 'clsx';

interface Props {
  checked: boolean;
  taskId: string;
}

export const CompleteButton: React.FC<Props> = ({ taskId, checked }) => {
  const dispatch = useAppDispatch();

  return (
    <label className="complete-checkbox">
      <input
        type="checkbox"
        className={clsx(style['visually-hidden'])}
        onChange={() => dispatch(completeTask(taskId))}
        checked={checked || false}
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
