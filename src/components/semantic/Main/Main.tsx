import { FC } from 'react';
import cls from './Main.module.scss';
// import Preloader from '../../UI/Preloader/Preloader';

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
