import NavBar from '../../../app/router/ui/navigation/NavBar';
import BurgerButton from './ui/BurgerButton/BurgerButton';
import UserNameForm from './ui/UserNameForm/UserNameForm';

export const Header = () => {
  document.oncontextmenu = (e: MouseEvent) => {
    if (e.target instanceof HTMLCanvasElement && e.target.classList.contains('canvas'))
      return false;
  };

  return (
    <header className={'header'}>
      <div className={'header__container'}>
        <UserNameForm />
        <NavBar />
        <BurgerButton />
      </div>
    </header>
  );
};
