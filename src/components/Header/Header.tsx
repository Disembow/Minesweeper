import { RoutePaths } from '../../app/router/config/routes';
import AppLink from '../../app/router/ui/AppLink';
import { getUserNameFromLocalStorage } from '../../scripts/helpers/localStorage';

export const Header = () => {
  const username = getUserNameFromLocalStorage();

  return (
    <header className={'header'}>
      <div className={'header__container'}>
        <form className={'form'} name="username">
          <input
            autoComplete={'off'}
            name={'username'}
            className={'username__input'}
            placeholder={'Your name...'}
            value={username || ''}
            autoFocus={username === ''}
            onChange={console.log}
          />
          <button className="button__submit" type="submit"></button>
        </form>
        <div className="modes__container" /*onClick={modesHandler}*/>
          <AppLink linkTo={RoutePaths.home}>Home</AppLink>
          <AppLink linkTo={RoutePaths.beginner}>Beginner</AppLink>
          <AppLink linkTo={RoutePaths.intermediate}>Intermediate</AppLink>
          <AppLink linkTo={RoutePaths.expert}>Expert</AppLink>
          <AppLink linkTo={RoutePaths.nightmare}>Nightmare</AppLink>
          <AppLink linkTo={RoutePaths.results}>Results</AppLink>
        </div>
        <div className="burger__button">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};
