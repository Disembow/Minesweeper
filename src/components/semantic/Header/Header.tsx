import NavBar from './ui/NavBar/NavBar';
import BurgerButton from './ui/BurgerButton/BurgerButton';
import UserNameForm from './ui/UserNameForm/UserNameForm';
import cls from './Header.module.scss';

export const Header = () => {
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
