import React from 'react';

interface HeaderTitleProps {
  text: string;
  isDim?: boolean;
}

export const HeaderTitle = ({ text, isDim }: HeaderTitleProps): JSX.Element => {
  return <h1 className={`page-header__title${isDim ? ' page-header__title_dim' : ''}`}>{text}</h1>;
};
