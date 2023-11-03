import AppRouter from 'app/providers/router/ui/AppRouter';
import Footer from 'components/semantic/Footer/Footer';
import { Header } from 'components/semantic/Header/Header';
import Main from 'components/semantic/Main/Main';
import Overlay from 'components/UI/Overlay/Overlay';

export const App = () => {
  document.oncontextmenu = (e: MouseEvent) => !(e.target instanceof HTMLCanvasElement);

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
