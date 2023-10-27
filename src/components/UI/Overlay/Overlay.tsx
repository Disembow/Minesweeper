import { hideOverlay } from '../../../scripts/listeners/handleOverlay';
import { hidePopupMenu } from '../../../scripts/listeners/handlePopupMenu';

const Overlay = () => {
  const handleClick = () => {
    hideOverlay();
    hidePopupMenu();
  };

  return <div className="overlay" onClick={handleClick} />;
};

export default Overlay;
