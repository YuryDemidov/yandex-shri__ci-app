import React, { useState } from 'react';

import { BuildCard } from '../BuildCard/BuildCard';
import { Button } from '../Button/Button';
import { mockBuilds } from '../../assets/js/mockData';

import '../../assets/css/components/builds-list.css';

export const BuildsListContent = () => {
  const [builds, setBuilds] = useState(mockBuilds.data);

  const showMoreBuilds = () => {
    // Mock logic of loading new builds from server
    setBuilds((state) => [...state, ...state]);
  };

  return (
    <>
      <div className="builds-list">
        <ul className="builds-list__list">
          {builds.map((build) => (
            <li className="builds-list__item" key={build.id}>
              <BuildCard buildData={build} />
            </li>
          ))}
        </ul>
        <Button content="Show more" modifiers={['secondary']} clickHandler={showMoreBuilds} />
      </div>
    </>
  );
};
