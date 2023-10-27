import AppRouter from './app/router/ui/AppRouter';
import Footer from './components/semantic/Footer/Footer';
import { Header } from './components/semantic/Header/Header';
import Main from './components/semantic/Main/Main';
import Overlay from './components/UI/Overlay/Overlay';

export const App = () => {
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
