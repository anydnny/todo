import style from './Layout.module.css';
export const LayoutAside = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className={style.sidebar}>
      <div className="heading">
        <h1 className="heading__title">Task app</h1>
        <p className="heading__subtitle">Stay organized</p>
      </div>
      {children}
    </aside>
  );
};
