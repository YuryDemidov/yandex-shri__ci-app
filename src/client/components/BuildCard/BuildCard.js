import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IconWithTitle } from '../IconWithTItle/IconWithTitle';
import { Preloader } from '../Preloader/Preloader';
import { SvgIcon } from '../Svg/SvgIcon';
import { formatDateOutput, formatDurationOutput } from '../../assets/js/utils/functions/dateFormatter';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './BuildCard.module.scss';

export const BuildCard = ({ buildData: build, isLink }) => {
  useStyles(styles);

  if (!build.id) {
    return <Preloader />;
  }

  const buildUrl = `/build/${build.id}`;
  const dateOutput = formatDateOutput(build.start);
  const periodOutput = formatDurationOutput(build.duration);

  let iconId;
  if (build.status === 'Waiting' || build.status === 'InProgress') {
    iconId = 'clock';
  } else if (build.status === 'Fail' || build.status === 'Canceled') {
    iconId = 'cross';
  } else {
    iconId = 'check-mark';
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
