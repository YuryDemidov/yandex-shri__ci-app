import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { IconWithTitle } from '../IconWithTItle/IconWithTitle';
import { SvgIcon } from '../Svg/SvgIcon';

export const HeaderButtonsGroup = ({ buttonsSet, showBuildModal }) => {
  return (
    <div className="page-header__buttons-group">
      {buttonsSet.map((buttonType) => {
        let iconId = buttonType;
        let iconTitle = buttonType[0].toUpperCase() + buttonType.substring(1);
        let titleClass = 'hidden_mobile';
        let onClick;

        if (buttonType === 'build') {
          iconId = 'play';
          iconTitle = 'Run Build';
          onClick = showBuildModal;
        }

        if (buttonType === 'rebuild') {
          onClick = () => alert('rebuild');
        }

        if (buttonType === 'settings' && buttonsSet.length > 1) {
          titleClass = 'hidden';
        }

        const buttonContent = (
          <IconWithTitle
            icon={<SvgIcon id={`icon-${iconId}`} width={12} height={12} />}
            title={iconTitle}
            titleClass={titleClass}
            ariaHidden
          />
        );

        return buttonType === 'settings' ? (
          <Link to="/settings" key={buttonType} className="button button_secondary button_small button_link-flex">
            <span className="visually-hidden">{iconTitle}</span>
            {buttonContent}
          </Link>
        ) : (
          <Button
            key={buttonType}
            content={buttonContent}
            modifiers={['secondary', 'small']}
            ariaLabel={iconTitle}
            clickHandler={onClick}
          />
        );
      })}
    </div>
  );
};

HeaderButtonsGroup.propTypes = {
  buttonsSet: PropTypes.arrayOf(PropTypes.string),
  showBuildModal: PropTypes.func,
};
