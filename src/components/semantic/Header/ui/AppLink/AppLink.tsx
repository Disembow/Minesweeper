import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './AppLink.module.scss';
import { useAppDispatch } from '../../../../../app/store/hooks';
import { togglePopupMenuVisibility } from '../../../../../app/store/slices/gameSlice';

interface IAppLink {
  linkTo: string;
  children: string;
}

const AppLink: FC<IAppLink> = ({ linkTo, children }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (window.innerWidth <= 876) {
      dispatch(togglePopupMenuVisibility());
    }
  };

  return (
    <NavLink to={linkTo} className={cls.modes__item} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

export default AppLink;
