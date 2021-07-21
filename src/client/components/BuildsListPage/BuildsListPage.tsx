import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateBuilds } from '../../store/buildsSlice';
import { getStateSettings } from '../../store/settingsSlice';
import { BuildCard } from '../BuildCard/BuildCard';
import { Button } from '../Button/Button';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { HeaderTitle } from '../Header/HeaderTitle';
import { PageContent } from '../PageContent/PageContent';
import { PageHeader } from '../PageHeader/PageHeader';
import { Preloader } from '../Preloader/Preloader';
import { StartScreenPage } from '../StartScreenPage/StartScreenPage';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildsList.module.scss';

import { DbBuildModel } from '../../api/types';

interface BuildsListPageProps {
  // ToDO
  loadData: () => void;
}

export const BuildsListPage = ({ loadData }: BuildsListPageProps): JSX.Element => {
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

  const showMoreBuilds = useCallback(() => {
    // Mock logic of loading new builds from server
    // setBuilds((state) => [...state, ...state]);
  }, []);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text={settings.repoName} />}
        renderHeaderRight={() => <HeaderButtonsGroup buttonsSet={['build', 'settings']} />}
      />
      <PageContent>
        <div className="builds-list">
          <ul className="builds-list__list">
            {builds.map((build: DbBuildModel) => {
              return (
                <li className="builds-list__item" key={build.id}>
                  <BuildCard buildData={build} isLink />
                </li>
              );
            })}
          </ul>
          {builds && builds.length ? (
            <Button content="Show more" modifiers={['secondary']} clickHandler={showMoreBuilds} />
          ) : (
            <p>Loading builds...</p>
          )}
        </div>
      </PageContent>
    </>
  );
};

BuildsListPage.propTypes = {
  loadData: PropTypes.func.isRequired,
};
