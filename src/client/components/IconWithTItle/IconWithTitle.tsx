import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './IconWithTItle.module.scss';

interface IconWithTitleProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  additionalTitle?: string;
  titleClass?: string;
  ariaHidden?: boolean;
}

export const IconWithTitle = ({
  icon,
  title,
  additionalTitle,
  titleClass,
  ariaHidden,
}: IconWithTitleProps): JSX.Element => {
  useStyles(styles);

  return (
    <span className="icon-with-title">
      <span className="icon-with-title__icon">{icon}</span>
      <span
        className={`icon-with-title__title${titleClass ? ` ${titleClass}` : ''}`}
        aria-hidden={ariaHidden && 'true'}
      >
        {title}
      </span>
      {additionalTitle && (
        <span className="icon-with-title__title icon-with-title__title_additional">{additionalTitle}</span>
      )}
    </span>
  );
};
