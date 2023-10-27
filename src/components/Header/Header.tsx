import {
  getUserNameFromLocalStorage,
  setGameModeToLocalStorage,
} from '../../scripts/helpers/localStorage';
import { hideOverlay } from '../../scripts/listeners/handleOverlay';
import { defineCanvas } from '../../scripts/render/defineCanvas';

export const Header = () => {
  const username = getUserNameFromLocalStorage();

  const modesHandler = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains('modes__item') &&
      !e.target.classList.contains('results')
    ) {
      document.querySelector('.active')?.classList.remove('active');

      e.target.classList.add('active');

      const newMode = e.target.textContent?.toLowerCase();
      setGameModeToLocalStorage(newMode);

      const canvas = document.querySelector('.canvas');
      canvas?.remove();
      defineCanvas();

      hideOverlay();
    }

    const container = document.querySelector('.modes__container_active');
    container?.classList.remove('modes__container_active');
  };

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
        <div className="modes__container" onClick={modesHandler}>
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
