import React from 'react';

import { SvgIcon } from '../Svg/SvgIcon';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Preloader.module.scss';

export const Preloader = () => {
  useStyles(styles);

  return (
    <div className="preloader">
      <div className="preloader__icon">
        <SvgIcon id="preloader" width={38} height={38} />
      </div>
    </div>
  );
};
