import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { BuildCard } from '../BuildCard/BuildCard';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildLogs.module.scss';

export const BuildLogsContent = ({ buildData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useStyles(styles);

  const logOutput = buildData.logs;

  return (
    <div className="build-logs">
      <BuildCard buildData={buildData.details} />
      <pre className="build-logs__output">{logOutput}</pre>
    </div>
  );
};

BuildLogsContent.propTypes = {
  buildData: PropTypes.object,
};
