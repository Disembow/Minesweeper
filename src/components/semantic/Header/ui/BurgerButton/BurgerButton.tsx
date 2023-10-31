import cls from './BurgerButton.module.scss';
import { togglePopupMenuVisibility } from 'app/providers/store/slices/gameSlice';
import { useAppDispatch } from 'app/providers/store/hooks';

const BurgerButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(togglePopupMenuVisibility());

  return (
    <div className={cls.burger__button} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerButton;
