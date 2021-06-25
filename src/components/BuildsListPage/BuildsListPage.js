import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../App';
import { PageHeader } from '../Page/PageHeader';
import { PageContent } from '../Page/PageContent';
import { HeaderTitle } from '../Header/HeaderTitle';
import { HeaderButtonsGroup } from '../Header/HeaderButtonsGroup';
import { BuildsListContent } from './BuildsListContent';

export const BuildsListPage = ({ showBuildModal }) => {
  const { repoName } = useContext(AppContext);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text={repoName} />}
        renderHeaderRight={() => (
          <HeaderButtonsGroup buttonsSet={['build', 'settings']} showBuildModal={showBuildModal} />
        )}
      />
      <PageContent renderPageContent={() => <BuildsListContent />} />
    </>
  );
};

BuildsListPage.propTypes = {
  showBuildModal: PropTypes.func.isRequired,
};
