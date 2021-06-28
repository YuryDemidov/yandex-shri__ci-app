import React from 'react';
import PropTypes from 'prop-types';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './IconWithTItle.module.scss';

export const IconWithTitle = ({ icon, title, additionalTitle, titleClass, ariaHidden }) => {
  useStyles(styles);

  return (
    <span className="icon-with-title">
      <span className="icon-with-title__icon">{icon}</span>
      <span
        className={`icon-with-title__title${titleClass ? ` ${titleClass}` : ''}`}
        aria-hidden={ariaHidden ? 'true' : null}
      >
        {title}
      </span>
      {additionalTitle && (
        <span className="icon-with-title__title icon-with-title__title_additional">{additionalTitle}</span>
      )}
    </span>
  );
};

IconWithTitle.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  additionalTitle: PropTypes.string,
  titleClass: PropTypes.string,
  ariaHidden: PropTypes.bool,
};
