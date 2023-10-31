import { useEffect } from 'react';
import AppRouter from './app/providers/router/ui/AppRouter';
import Footer from './components/semantic/Footer/Footer';
import { Header } from './components/semantic/Header/Header';
import Main from './components/semantic/Main/Main';
import Overlay from './components/UI/Overlay/Overlay';

export const App = () => {
  useEffect(() => {
    const randomNum = Math.random();
    console.log(randomNum);

    if (randomNum > 0.8) throw new Error();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <Main>
          <AppRouter />
        </Main>
        <Footer />
        <Overlay />
      </div>
    </>
  );
};
