import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { hidePopupMenu } from '../../../../components/GameBoard/handlers/handlePopupMenu';
import { hideOverlay } from '../../../../components/UI/Overlay/handleOverlay';
import cls from './AppLink.module.scss';

interface IAppLink {
  linkTo: string;
  children: string;
}

const AppLink: FC<IAppLink> = ({ linkTo, children }) => {
  const handleClick = () => {
    hidePopupMenu();
    hideOverlay();
  };

  return (
    <NavLink to={linkTo} className={cls.modes__item} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

export default AppLink;
