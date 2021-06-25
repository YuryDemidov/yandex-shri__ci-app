import React from 'react';
import PropTypes from 'prop-types';

export const HeaderTitle = ({ text, isDim }) => {
  return <h1 className={`page-header__title${isDim ? ' page-header__title_dim' : ''}`}>{text}</h1>;
};

HeaderTitle.propTypes = {
  text: PropTypes.string.isRequired,
  isDim: PropTypes.bool,
};
