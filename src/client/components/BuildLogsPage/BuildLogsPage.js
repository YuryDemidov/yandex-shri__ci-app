import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStateBuildData } from '../../store/buildDataSlice';
import PropTypes from 'prop-types';

import { PageHeader } from '../Page/PageHeader';
import { PageContent } from '../Page/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { BuildLogsContent } from './BuildLogsContent';
import { Preloader } from '../Preloader/Preloader';
import { getStateSettings } from '../../store/settingsSlice';

export const BuildLogsPage = ({ loadData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const buildData = useSelector(getStateBuildData);
  const { repoName } = useSelector(getStateSettings);

  useEffect(() => {
    dispatch(loadData({ id }));
  }, [dispatch, loadData, id]);

  if (!buildData || !buildData.details) {
    return <Preloader />;
  }

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text={repoName} />}
        renderHeaderRight={() => <HeaderButtonsGroup buttonsSet={['rebuild', 'settings']} />}
      />
      <PageContent renderPageContent={() => <BuildLogsContent buildData={buildData} />} />
    </>
  );
};

BuildLogsPage.propTypes = {
  loadData: PropTypes.func.isRequired,
};
