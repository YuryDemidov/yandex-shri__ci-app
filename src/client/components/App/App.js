import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { clientRoutesConfig } from '../../routes';

import { getModalState } from '../../store/modalSlice';
import { SvgSprite } from '../Svg/SvgSprite';
import { PageFooter } from '../PageFooter/PageFooter';
import { ModalWrap } from '../ModalWrap/ModalWrap';
import { NewBuildModal } from '../NewBuildModal/NewBuildModal';
import { isServer } from '../../../server/utils/isServer';

import useStyles from 'isomorphic-style-loader/useStyles';
import normalizeStyles from './normalize.scss';
import styles from './App.module.scss';

export const App = () => {
  const { isOpened: isModalOpened } = useSelector(getModalState);
  const modal = isModalOpened ? <NewBuildModal /> : null;
  useStyles(styles);
  useStyles(normalizeStyles);

  let scrollSequence = [];
  let firstTenScrollTicksTiming = 0;
  const scrollHandler = (evt) => {
    if (scrollSequence.length < 11) {
      scrollSequence.push(evt.timeStamp);
      return;
    }
    firstTenScrollTicksTiming = scrollSequence[10] - scrollSequence[1];
    if (firstTenScrollTicksTiming > 2000) {
      firstTenScrollTicksTiming = 0;
      scrollSequence = [];
      return;
    }
    document.removeEventListener('scroll', scrollHandler);
    window.perf_counter.send('firstTenScrollTicksTiming', +firstTenScrollTicksTiming.toFixed(3));
  };

  !isServer() && document.addEventListener('scroll', scrollHandler);

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
