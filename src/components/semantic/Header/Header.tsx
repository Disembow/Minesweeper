import NavBar from '../../../app/router/ui/navigation/NavBar';
import BurgerButton from './ui/BurgerButton/BurgerButton';
import UserNameForm from './ui/UserNameForm/UserNameForm';
import cls from './Header.module.scss';

export const Header = () => {
  document.oncontextmenu = (e: MouseEvent) => {
    if (e.target instanceof HTMLCanvasElement && e.target.classList.contains('canvas'))
      return false;
  };

  return (
    <header className={cls.header}>
      <div className={cls.header__container}>
        <UserNameForm />
        <NavBar />
        <BurgerButton />
      </div>
    </header>
  );
};
