import React from 'react';
import PropTypes from 'prop-types';

export const PageContent = ({ renderPageContent }) => {
  return (
    <main className="page__content page-content">
      <div className="container">{renderPageContent()}</div>
    </main>
  );
};

PageContent.propTypes = {
  renderPageContent: PropTypes.func.isRequired,
};
