import { FC } from 'react';
import cls from './NotFoundPage.module.scss';

interface INotFoundPage {}

const NotFoundPage: FC<INotFoundPage> = () => {
  return <div className={cls.NotFoundPage}>Ooops, this page is not found here...</div>;
};

export default NotFoundPage;
