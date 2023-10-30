import { toggleOverlay } from '../../../../UI/Overlay/handleOverlay';
import { showPopupMenu } from '../../../../GameBoard/handlers/handlePopupMenu';
import cls from './BurgerButton.module.scss';

const BurgerButton = () => {
  const handleClick = () => {
    showPopupMenu();
    toggleOverlay();
  };

  return (
    <div className={cls.burger__button} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerButton;
