import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IconWithTitle } from '../IconWithTItle/IconWithTitle';
import { SvgIcon } from '../Svg/SvgIcon';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildCard.module.scss';

export const BuildCard = ({ buildData: build, isLink }) => {
  useStyles(styles);

  const buildUrl = `/build/${build.id}`;
  const dateStringParts = build.start && new Date(build.start).toString().split(' ');
  const dateOutput =
    dateStringParts && `${dateStringParts[1]} ${dateStringParts[2]}, ${dateStringParts[4].substring(0, 5)}`;
  const periodMinutes = build.duration % 60;
  const periodHours = (build.duration - periodMinutes) / 60;
  const periodOutput = `${periodHours ? `${periodHours} h` : ''}${periodMinutes ? ` ${periodMinutes} min` : ''}`;

  let iconId;
  if (build.status === 'Success') {
    iconId = 'check-mark';
  } else if (build.status === 'Fail') {
    iconId = 'cross';
  } else {
    iconId = 'clock';
  }

  const buildCardContent = (
    <>
      <h3 className="build-card__heading">
        <span className={`build-card__number build-card__number_${build.status.toLowerCase()}`}>
          <IconWithTitle
            icon={<SvgIcon id={`icon-${iconId}`} width={16} height={16} />}
            title={`#${build.buildNumber}`}
          />
        </span>
        <span className="build-card__commit-message">{build.commitMessage}</span>
      </h3>
      <div className="build-card__commit-info">
        <IconWithTitle
          icon={<SvgIcon id="icon-commit" width={16} height={16} />}
          title={build.branchName}
          additionalTitle={build.commitHash.substring(0, 7)}
        />
        <IconWithTitle icon={<SvgIcon id="icon-user" width={16} height={16} />} title={build.authorName} />
      </div>
      {(dateOutput || periodOutput) && (
        <div className="build-card__date-info">
          {dateOutput && (
            <IconWithTitle icon={<SvgIcon id="icon-calendar" width={16} height={16} />} title={dateOutput} />
          )}
          {periodOutput && (
            <IconWithTitle icon={<SvgIcon id="icon-timer" width={16} height={16} />} title={periodOutput} />
          )}
        </div>
      )}
    </>
  );

  return isLink ? (
    <Link className="build-card" to={buildUrl}>
      {buildCardContent}
    </Link>
  ) : (
    <div className="build-card">{buildCardContent}</div>
  );
};

BuildCard.propTypes = {
  buildData: PropTypes.exact({
    id: PropTypes.string,
    configurationId: PropTypes.string,
    buildNumber: PropTypes.number,
    commitMessage: PropTypes.string,
    commitHash: PropTypes.string,
    branchName: PropTypes.string,
    authorName: PropTypes.string,
    status: PropTypes.oneOf(['Waiting', 'InProgress', 'Success', 'Fail', 'Canceled']),
    start: PropTypes.string,
    duration: PropTypes.number,
  }),
  isLink: PropTypes.bool,
};
