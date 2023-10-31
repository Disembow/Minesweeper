import { FC } from 'react';
// import Preloader from 'components/UI/Preloader/Preloader';
import cls from './Main.module.scss';

interface IMain {
  children: JSX.Element;
}

const Main: FC<IMain> = ({ children }) => {
  return (
    <main className={cls.main}>
      {children}
      {/* <Preloader /> */}
    </main>
  );
};

export default Main;
