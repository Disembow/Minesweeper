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
        <div className="modes__container">
          <span className="modes__item beginner">Beginner</span>
          <span className="modes__item intermediate">Intermediate</span>
          <span className="modes__item expert">Expert</span>
          <span className="modes__item nightmare">Nightmare</span>
          <span className="modes__item results">Results</span>
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
