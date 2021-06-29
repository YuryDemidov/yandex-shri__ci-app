import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { SvgSprite } from '../Svg/SvgSprite';
import { PageFooter } from '../PageFooter/PageFooter';
import { ModalWrap } from '../ModalWrap/ModalWrap';
import { NewBuildModal } from '../NewBuildModal/NewBuildModal';
import { clientRoutesConfig } from '../../routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import normalizeStyles from './normalize.scss';
import styles from './App.module.scss';

export const App = () => {
  const [modal, setModal] = useState(null);
  useStyles(styles);
  useStyles(normalizeStyles);

  const closeModal = () => {
    setModal(null);
  };
  const showBuildModal = () => {
    setModal(<NewBuildModal closeModal={closeModal} />);
  };

  return (
    <div className={`page${modal ? ' page_no-scroll' : ''}`}>
      <SvgSprite />
      <Switch>
        {clientRoutesConfig.map((route) => (
          <Route path={route.path} exact={route.path === '/'} key={route.path}>
            <route.component loadData={route.loadData} showBuildModal={route.path === '/' ? showBuildModal : null} />
          </Route>
        ))}
      </Switch>
      <ModalWrap modal={modal} modalClass="new-build-modal" closeModal={closeModal} />
      <PageFooter />
    </div>
  );
};
