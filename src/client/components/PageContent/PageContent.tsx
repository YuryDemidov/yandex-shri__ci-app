import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: PageContentProps): JSX.Element => {
  return (
    <main className="page__content page-content">
      <div className="container">{children}</div>
    </main>
  );
};
