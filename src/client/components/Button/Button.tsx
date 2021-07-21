import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Button.module.scss';

interface ButtonProps {
  content: React.ReactNode;
  modifiers?: string[];
  type?: 'submit' | 'button';
  disabled?: boolean;
  ariaLabel?: string;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  content,
  modifiers = [],
  type = 'button',
  disabled,
  ariaLabel,
  clickHandler,
}: ButtonProps): JSX.Element => {
  useStyles(styles);

  return (
    <button
      className={modifiers.reduce((className, modifier) => `${className} button_${modifier}`, 'button')}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={clickHandler}
    >
      <span className="button__content">{content}</span>
    </button>
  );
};
