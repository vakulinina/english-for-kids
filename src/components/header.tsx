/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Menu from './menu';
import Category from '../models/category';

interface Props {
  handleChange: () => void;
  isGameMode: boolean;
  categories: Category[];
}

const Header: React.FunctionComponent<Props> = ({
  handleChange, isGameMode, categories,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <nav>
        <div className={isMenuOpen ? 'menu-toggle menu-toggle-active' : 'menu-toggle'}>
          <input
            type="checkbox"
            className="menu-toggle-input"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <span />
          <Menu
            isMenuOpen={isMenuOpen}
            isGameMode={isGameMode}
            hideMenu={() => setIsMenuOpen(!isMenuOpen)}
            categories={categories}
          />
          {isMenuOpen ? <div className="menu-background" onClick={() => setIsMenuOpen(!isMenuOpen)} /> : ''}
        </div>
      </nav>
      <div className="game-score" />
      <label className="mode-toggle" htmlFor="mode-input">
        <input
          className="toggle-input visually-hidden"
          type="checkbox"
          id="mode-input"
          onChange={handleChange}
        />
        <span className="toggle-fill" />
      </label>
    </header>
  );
};

export default Header;
