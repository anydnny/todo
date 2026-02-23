import style from './Layout.module.css';

export const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return <main className={style.main}>{children}</main>;
};
