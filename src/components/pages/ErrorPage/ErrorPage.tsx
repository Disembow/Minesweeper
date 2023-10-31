import { FC } from 'react';
import cls from './ErrorPage.module.scss';
import { classNames } from '../../../helpers/classNames/classNames';

interface IErrorPage {
  className?: string;
}

const ErrorPage: FC<IErrorPage> = ({ className }) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.ErrorPage, {}, [className ?? ''])}>
      <h3 className={cls.text}>Some error was occured, please reload the page</h3>
      <button onClick={reloadPage}>Reload page</button>
    </div>
  );
};

export default ErrorPage;
