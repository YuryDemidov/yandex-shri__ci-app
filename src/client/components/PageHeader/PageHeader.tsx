import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PageHeader.module.scss';

type RenderFunction = () => React.ReactNode;

interface PageHeaderProps {
  renderHeaderLeft: RenderFunction;
  renderHeaderRight: RenderFunction;
}

export const PageHeader = ({ renderHeaderLeft, renderHeaderRight }: PageHeaderProps): JSX.Element => {
  useStyles(styles);

  return (
    <header className="page__header page-header">
      <div className="container">
        <div className="page-header__content">
          <div className="page-header__left">{renderHeaderLeft()}</div>
          <div className="page-header__right">{renderHeaderRight()}</div>
        </div>
      </div>
    </header>
  );
};
