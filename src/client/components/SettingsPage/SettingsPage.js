import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from '../PageHeader/PageHeader';
import { PageContent } from '../PageContent/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { SettingsContent } from './SettingsContent';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Settings.module.scss';

export const SettingsPage = ({ loadData }) => {
  useStyles(styles);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text="School CI server" isDim />}
        renderHeaderRight={() => null}
      />
      <PageContent renderPageContent={() => <SettingsContent loadData={loadData} />} />
    </>
  );
};

SettingsPage.propTypes = {
  loadData: PropTypes.func.isRequired,
};
