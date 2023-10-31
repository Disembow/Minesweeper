import { FC } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Button } from 'components/UI/Button/Button';
import cls from './ErrorPage.module.scss';

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
      <Button onClick={reloadPage}>Reload page</Button>
    </div>
  );
};

export default ErrorPage;
