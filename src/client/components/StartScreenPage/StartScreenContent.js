import React from 'react';
import { NavLink } from 'react-router-dom';

import { SvgIcon } from '../Svg/SvgIcon';

import useStyles from 'isomorphic-style-loader/useStyles';
import buttonStyles from '../Button/Button.module.scss';

export const StartScreenContent = () => {
  useStyles(buttonStyles);

  return (
    <div className="start-screen">
      <SvgIcon id="icon-tools" width={124} height={124} />
      <p className="start-screen__description">Configure repository connection and synchronization settings</p>
      <NavLink to="/settings" className="button button_primary">
        <span className="button__content">Open settings</span>
      </NavLink>
    </div>
  );
};
