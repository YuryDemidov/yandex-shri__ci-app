import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { SvgSprite } from '../Svg/SvgSprite';
import { PageFooter } from '../PageFooter/PageFooter';
import { NewBuildModal } from '../NewBuildModal/NewBuildModal';
import { clientRoutesConfig } from '../../routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import normalizeStyles from './normalize.scss';
import styles from './App.module.scss';

export const App = () => {
  const [showNewBuildModal, setShowNewBuildModal] = useState(false);
  useStyles(styles);
  useStyles(normalizeStyles);

  const showBuildModal = () => {
    setShowNewBuildModal(true);
  };
  const closeBuildModal = () => {
    setShowNewBuildModal(false);
  };

  return (
    <div className={`page${showNewBuildModal ? ' page_no-scroll' : ''}`}>
      <SvgSprite />
      <Switch>
        {clientRoutesConfig.map((route) => (
          <Route path={route.path} exact={route.path === '/'} key={route.path}>
            <route.component loadData={route.loadData} showBuildModal={route.path === '/' ? showBuildModal : null} />
          </Route>
        ))}
      </Switch>
      <div className={`modal-wrap${showNewBuildModal ? '' : ' hidden'}`}>
        <div className="modal-wrap__background" onClick={closeBuildModal} />
        <NewBuildModal show={showNewBuildModal} setShow={setShowNewBuildModal} />
      </div>
      <PageFooter />
    </div>
  );
};
