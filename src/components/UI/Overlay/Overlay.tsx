import { hideOverlay } from './handleOverlay';
import { hidePopupMenu } from '../../GameBoard/handlers/handlePopupMenu';
import cls from './Overlay.module.scss';

const Overlay = () => {
  const handleClick = () => {
    hideOverlay();
    hidePopupMenu();
  };

  return <div className={cls.overlay} onClick={handleClick} />;
};

export default Overlay;
