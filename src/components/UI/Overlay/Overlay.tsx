import cls from './Overlay.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/providers/store/hooks';
import { togglePopupMenuVisibility } from '../../../app/providers/store/slices/gameSlice';
import { classNames } from '../../../helpers/classNames/classNames';

const Overlay = () => {
  const isVisible = useAppSelector((state) => state.game.isPopupMenuVisible);
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(togglePopupMenuVisibility());

  return (
    <div className={classNames(cls.overlay, { [cls.visible]: isVisible })} onClick={handleClick} />
  );
};

export default Overlay;
