import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateBuildData } from '../../store/buildDataSlice';
import { requestBuild } from '../../store/buildsSlice';
import { Button } from '../Button/Button';
import { IconWithTitle } from '../IconWithTItle/IconWithTitle';
import { SvgIcon } from '../Svg/SvgIcon';

export const HeaderButtonsGroup = ({ buttonsSet, showBuildModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const buildData = useSelector(getStateBuildData);

  const runRebuild = () => {
    dispatch(requestBuild(buildData.details.commitHash))
      .then((data) => {
        const newBuildId = data.payload.data.id;
        if (newBuildId) {
          history.push(`/build/${newBuildId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          onClick = runRebuild;
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
