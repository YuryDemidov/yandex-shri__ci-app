import React from 'react';
import { SvgIcon } from '../Svg/SvgIcon';

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__icon">
        <SvgIcon id="preloader" width={38} height={38} />
      </div>
    </div>
  );
};
