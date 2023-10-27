import { toggleOverlay } from '../../../../../scripts/listeners/handleOverlay';
import { showPopupMenu } from '../../../../../scripts/listeners/handlePopupMenu';

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
