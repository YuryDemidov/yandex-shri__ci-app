import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/components/button.css';

export const Button = ({ content, modifiers = [], type = 'button', disabled, ariaLabel, clickHandler }) => {
  return (
    <button
      className={modifiers.reduce((className, modifier) => `${className} button_${modifier}`, 'button')}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={clickHandler}
    >
      <span className="button__content">{content}</span>
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['submit', 'button']),
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  clickHandler: PropTypes.func,
};
