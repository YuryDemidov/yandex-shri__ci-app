import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SvgSprite } from './Svg/SvgSprite';
import { PageFooter } from './Page/PageFooter';
import { BuildsListPage } from './BuildsListPage/BuildsListPage';
import { StartScreenPage } from './StartScreenPage/StartScreenPage';
import { SettingsPage } from './SettingsPage/SettingsPage';
import { BuildLogsPage } from './BuildLogsPage/BuildLogsPage';
import { NewBuildModal } from './NewBuildModal/NewBuildModal';
import { mockConfig } from '../assets/js/mockData';

export const AppContext = createContext(mockConfig);

export default function App() {
  const [showNewBuildModal, setShowNewBuildModal] = useState(false);
  const showBuildModal = () => {
    setShowNewBuildModal(true);
  };
  const closeBuildModal = () => {
    setShowNewBuildModal(false);
  };

  return (
    <div className={`page${showNewBuildModal ? ' page_no-scroll' : ''}`}>
      <SvgSprite />
      <AppContext.Provider value={mockConfig}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {mockConfig.repoName && mockConfig.buildCommand ? (
                <BuildsListPage showBuildModal={showBuildModal} />
              ) : (
                <StartScreenPage />
              )}
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/build/:number">
              <BuildLogsPage repoName={mockConfig.repoName} />
            </Route>
          </Switch>
        </BrowserRouter>
        <div className={`modal-wrap${showNewBuildModal ? '' : ' hidden'}`}>
          <div className="modal-wrap__background" onClick={closeBuildModal} />
          <NewBuildModal show={showNewBuildModal} setShow={setShowNewBuildModal} />
        </div>
      </AppContext.Provider>
      <PageFooter />
    </div>
  );
}
