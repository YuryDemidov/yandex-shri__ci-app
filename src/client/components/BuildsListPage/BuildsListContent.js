import React from 'react';
import PropTypes from 'prop-types';

import { BuildCard } from '../BuildCard/BuildCard';
import { Button } from '../Button/Button';

import '../../assets/css/components/builds-list.css';

export const BuildsListContent = ({ builds, showMoreBuilds }) => {
  return (
    <>
      <div className="builds-list">
        <ul className="builds-list__list">
          {builds.map((build) => (
            <li className="builds-list__item" key={build.id}>
              <BuildCard buildData={build} isLink />
            </li>
          ))}
        </ul>
        <Button content="Show more" modifiers={['secondary']} clickHandler={showMoreBuilds} />
      </div>
    </>
  );
};

BuildsListContent.propTypes = {
  builds: PropTypes.array.isRequired,
  showMoreBuilds: PropTypes.func.isRequired,
};
