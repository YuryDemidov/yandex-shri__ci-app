import React from 'react';

import { PageHeader } from '../Page/PageHeader';
import { PageContent } from '../Page/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { SettingsContent } from './SettingsContent';

export const SettingsPage = () => {
  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text="School CI server" isDim />}
        renderHeaderRight={() => null}
      />
      <PageContent renderPageContent={() => <SettingsContent />} />
    </>
  );
};
