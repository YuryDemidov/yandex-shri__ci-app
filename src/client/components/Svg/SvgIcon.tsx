import React from 'react';

interface IconProps {
  id: string;
  width: number;
  height: number;
}

export const SvgIcon = ({ id, width, height }: IconProps): JSX.Element => {
  return (
    <svg width={width} height={height} className="svg-icon">
      <use xlinkHref={`#${id}`} />
    </svg>
  );
};
