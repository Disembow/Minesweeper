import { hideOverlay } from './handleOverlay';
import { hidePopupMenu } from '../../GameBoard/handlers/handlePopupMenu';

const Overlay = () => {
  const handleClick = () => {
    hideOverlay();
    hidePopupMenu();
  };

  return <div className="overlay" onClick={handleClick} />;
};

export default Overlay;
