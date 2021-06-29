import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateSettings } from '../../store/settingsSlice';
import { getStateBuilds } from '../../store/buildsSlice';
import { StartScreenPage } from '../StartScreenPage/StartScreenPage';
import { PageHeader } from '../PageHeader/PageHeader';
import { PageContent } from '../PageContent/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { BuildsListContent } from './BuildsListContent';
import { Preloader } from '../Preloader/Preloader';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildsList.module.scss';

export const BuildsListPage = ({ loadData, showBuildModal }) => {
  const dispatch = useDispatch();
  const settings = useSelector(getStateSettings);
  const builds = useSelector(getStateBuilds);
  useStyles(styles);

  useEffect(() => {
    dispatch(loadData());
  }, [loadData, dispatch]);

  if (!settings || !settings.repoName || !settings.buildCommand) {
    return <StartScreenPage />;
  }

  if (!builds) {
    return <Preloader />;
  }

  const showMoreBuilds = () => {
    // Mock logic of loading new builds from server
    // setBuilds((state) => [...state, ...state]);
  };

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text={settings.repoName} />}
        renderHeaderRight={() => (
          <HeaderButtonsGroup buttonsSet={['build', 'settings']} showBuildModal={showBuildModal} />
        )}
      />
      <PageContent renderPageContent={() => <BuildsListContent builds={builds} showMoreBuilds={showMoreBuilds} />} />
    </>
  );
};

BuildsListPage.propTypes = {
  loadData: PropTypes.func.isRequired,
  showBuildModal: PropTypes.func.isRequired,
};
