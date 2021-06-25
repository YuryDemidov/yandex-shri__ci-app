import React from 'react';

import '../../assets/css/components/page-footer.css';

export const PageFooter = () => {
  return (
    <footer className="page__footer page-footer">
      <div className="container">
        <div className="page-footer__content">
          <nav className="page-footer__links">
            <a className="link page-footer__link" href="/">
              Support
            </a>
            <a className="link page-footer__link" href="/">
              Learning
            </a>
            <a className="link page-footer__link" href="/">
              Русская версия
            </a>
          </nav>
          <div className="page-footer__copyright">© {new Date().getFullYear()} Iurii Demidov</div>
        </div>
      </div>
    </footer>
  );
};
