import { classNames } from '../../../../helpers/classNames/classNames';
import { useAppSelector } from '../../../store/hooks';
import { RoutePaths } from '../../config/routes';
import AppLink from './AppLink';
import cls from './NavBar.module.scss';

const NavBar = () => {
  const isVisible = useAppSelector((state) => state.game.isPopupMenuVisible);

  return (
    <div className={classNames(cls.modes__container, { [cls.modes__container_active]: isVisible })}>
      <AppLink linkTo={RoutePaths.home}>Home</AppLink>
      <AppLink linkTo={RoutePaths.beginner}>Beginner</AppLink>
      <AppLink linkTo={RoutePaths.intermediate}>Intermediate</AppLink>
      <AppLink linkTo={RoutePaths.expert}>Expert</AppLink>
      <AppLink linkTo={RoutePaths.nightmare}>Nightmare</AppLink>
      <AppLink linkTo={RoutePaths.results}>Results</AppLink>
    </div>
  );
};

export default NavBar;
