import { RoutePaths } from '../../config/routes';
import AppLink from './AppLink';
import cls from './NavBar.module.scss';

const NavBar = () => {
  return (
    <div className={cls.modes__container}>
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
