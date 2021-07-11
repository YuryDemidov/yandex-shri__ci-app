import React from 'react';
import PropTypes from 'prop-types';

export const SvgIcon = ({ id, width, height }) => {
  return (
    <svg width={width} height={height} className="svg-icon">
      <use xlinkHref={`#${id}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
