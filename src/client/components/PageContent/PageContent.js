import React from 'react';
import PropTypes from 'prop-types';

export const PageContent = ({ children }) => {
  return (
    <main className="page__content page-content">
      <div className="container">{children}</div>
    </main>
  );
};

PageContent.propTypes = {
  children: PropTypes.element.isRequired,
};
