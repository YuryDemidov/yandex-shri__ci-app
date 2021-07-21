import React from 'react';
import { NavLink } from 'react-router-dom';

import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { HeaderTitle } from '../Header/HeaderTitle';
import { PageContent } from '../PageContent/PageContent';
import { PageHeader } from '../PageHeader/PageHeader';
import { SvgIcon } from '../Svg/SvgIcon';

import useStyles from 'isomorphic-style-loader/useStyles';
import buttonStyles from '../Button/Button.module.scss';
import styles from './StartScreen.module.scss';

export const StartScreenPage = (): JSX.Element => {
  useStyles(styles);
  useStyles(buttonStyles);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text="School CI server" isDim />}
        renderHeaderRight={() => <HeaderButtonsGroup buttonsSet={['settings']} />}
      />
      <PageContent>
        <div className="start-screen">
          <SvgIcon id="icon-tools" width={124} height={124} />
          <p className="start-screen__description">Configure repository connection and synchronization settings</p>
          <NavLink to="/settings" className="button button_primary">
            <span className="button__content">Open settings</span>
          </NavLink>
        </div>
      </PageContent>
    </>
  );
};
