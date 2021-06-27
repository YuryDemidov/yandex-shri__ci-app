import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from '../Page/PageHeader';
import { PageContent } from '../Page/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { SettingsContent } from './SettingsContent';

export const SettingsPage = ({ loadData }) => {
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
