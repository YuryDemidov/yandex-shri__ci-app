import React from 'react';

import { PageHeader } from '../Page/PageHeader';
import { PageContent } from '../Page/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { StartScreenContent } from './StartScreenContent';

import '../../assets/css/components/start-screen.css';

export const StartScreenPage = () => {
  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text="School CI server" isDim />}
        renderHeaderRight={() => <HeaderButtonsGroup buttonsSet={['settings']} />}
      />
      <PageContent renderPageContent={() => <StartScreenContent />} />
    </>
  );
};
