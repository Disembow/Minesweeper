import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../../helpers/classNames/classNames';
import { ButtonSize, ButtonTheme } from './types/ButtonTypes';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  square?: boolean;
}

export const Button: FC<IButton> = ({
  children,
  className = '',
  theme = ButtonTheme.STROKE,
  size = ButtonSize.M,
  square = false,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classNames(
        cls.Button,
        { [cls[size]]: true, [cls.square]: square, [cls[theme]]: true },
        [className],
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
