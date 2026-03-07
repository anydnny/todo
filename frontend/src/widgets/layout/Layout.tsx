import style from './Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.layout}>{children}</div>;
};
