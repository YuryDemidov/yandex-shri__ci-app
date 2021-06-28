import React from 'react';

import { PageHeader } from '../PageHeader/PageHeader';
import { PageContent } from '../PageContent/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { StartScreenContent } from './StartScreenContent';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './StartScreen.module.scss';

export const StartScreenPage = () => {
  useStyles(styles);

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
