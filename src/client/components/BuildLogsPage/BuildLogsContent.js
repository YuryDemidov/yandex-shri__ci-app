import React, { useEffect } from 'react';
import Convert from 'ansi-to-html/lib/ansi_to_html';
import PropTypes from 'prop-types';

import { BuildCard } from '../BuildCard/BuildCard';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildLogs.module.scss';

export const BuildLogsContent = ({ buildData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useStyles(styles);

  const ansiConverter = new Convert();
  const logOutput = ansiConverter.toHtml(buildData.logs);

  return (
    <div className="build-logs">
      <BuildCard buildData={buildData.details} />
      {logOutput && <pre className="build-logs__output" dangerouslySetInnerHTML={{ __html: logOutput }} />}
    </div>
  );
};

BuildLogsContent.propTypes = {
  buildData: PropTypes.object,
};
