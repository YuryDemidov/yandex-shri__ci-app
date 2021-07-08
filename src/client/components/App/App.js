import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { clientRoutesConfig } from '../../routes';

import { getModalState } from '../../store/modalSlice';
import { SvgSprite } from '../Svg/SvgSprite';
import { PageFooter } from '../PageFooter/PageFooter';
import { ModalWrap } from '../ModalWrap/ModalWrap';
import { NewBuildModal } from '../NewBuildModal/NewBuildModal';

import useStyles from 'isomorphic-style-loader/useStyles';
import normalizeStyles from './normalize.scss';
import styles from './App.module.scss';

export const App = () => {
  const { isOpened: isModalOpened } = useSelector(getModalState);
  const modal = isModalOpened ? <NewBuildModal /> : null;
  useStyles(styles);
  useStyles(normalizeStyles);

  return (
    <div className={`page${modal ? ' page_no-scroll' : ''}`}>
      <SvgSprite />
      <Switch>
        {clientRoutesConfig.map((route) => (
          <Route path={route.path} exact={route.exact} key={route.path}>
            <route.component loadData={route.loadData} />
          </Route>
        ))}
      </Switch>
      <ModalWrap modal={modal} modalClass="new-build-modal" />
      <PageFooter />
    </div>
  );
};
