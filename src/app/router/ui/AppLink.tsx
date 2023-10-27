import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface IAppLink {
  linkTo: string;
  children: string;
}

const AppLink: FC<IAppLink> = ({ linkTo, children }) => {
  return (
    <NavLink to={linkTo} className={'modes__item'}>
      {children}
    </NavLink>
  );
};

export default AppLink;
