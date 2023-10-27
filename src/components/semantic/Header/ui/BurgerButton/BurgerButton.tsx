import { toggleOverlay } from '../../../../UI/Overlay/handleOverlay';
import { showPopupMenu } from '../../../../GameBoard/handlers/handlePopupMenu';

const BurgerButton = () => {
  const handleClick = () => {
    showPopupMenu();
    toggleOverlay();
  };

  return (
    <div className="burger__button" onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerButton;
