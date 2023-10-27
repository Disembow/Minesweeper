import { FC } from 'react';
// import Preloader from '../../UI/Preloader/Preloader';

interface IMain {
  children: JSX.Element;
}

const Main: FC<IMain> = ({ children }) => {
  return (
    <main className="main">
      {children}
      {/* <Preloader /> */}
    </main>
  );
};

export default Main;
