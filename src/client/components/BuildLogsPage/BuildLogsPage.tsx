import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Convert from 'ansi-to-html';

import { getStateBuildData } from '../../store/buildDataSlice';
import { getStateSettings } from '../../store/settingsSlice';
import { BuildCard } from '../BuildCard/BuildCard';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { HeaderTitle } from '../Header/HeaderTitle';
import { PageContent } from '../PageContent/PageContent';
import { PageHeader } from '../PageHeader/PageHeader';
import { Preloader } from '../Preloader/Preloader';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildLogs.module.scss';

interface BuildLogsPageProps {
  // TODO
  loadData: () => void;
}

export const BuildLogsPage = ({ loadData }: BuildLogsPageProps): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();
  const buildData = useSelector(getStateBuildData);
  const { repoName } = useSelector(getStateSettings);
  useStyles(styles);

  useEffect(() => {
    // @ts-ignore
    dispatch(loadData({ id }));
    window.scrollTo(0, 0);
  }, [dispatch, loadData, id]);

  if (!buildData || !buildData.details) {
    return <Preloader />;
  }

  const ansiConverter = new Convert();
  const logOutput = ansiConverter.toHtml(buildData.logs);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text={repoName} />}
        renderHeaderRight={() => <HeaderButtonsGroup buttonsSet={['rebuild', 'settings']} />}
      />
      <PageContent>
        <div className="build-logs">
          <BuildCard buildData={buildData.details} />
          {logOutput && <pre className="build-logs__output" dangerouslySetInnerHTML={{ __html: logOutput }} />}
        </div>
      </PageContent>
    </>
  );
};

BuildLogsPage.propTypes = {
  loadData: PropTypes.func.isRequired,
};
