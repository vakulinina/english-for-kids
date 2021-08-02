/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

const Footer: React.FunctionComponent = () => (
  <footer className="footer">
    <div className="contacts">
      <a href="https://github.com/vakulinina" className="footer-link github">
        <img src="./icons/github-logo.svg" alt="Github" />
      </a>
      <a href="https://rs.school/js/" className="footer-link rs-school">
        <img src="./icons/rss-logo.svg" alt="RS School" />
      </a>
    </div>
    <div className="year-created">2021</div>
  </footer>
);

export default Footer;
