import style from './NoTaskMessage.module.css';

export const NoTaskMessage: React.FC = () => {
  return (
    <div className={style.noTaskMessage}>
      <span>No tasks yet</span>
      <p>Create new task to get started</p>
    </div>
  );
};
