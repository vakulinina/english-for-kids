import React, { useState, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Category from '../models/category';
import LoginModal from './login-modal';
import { useLoadMoreCategories } from '../common/custom-hooks';

interface Props {
  isMenuOpen: boolean;
  isGameMode: boolean;
  hideMenu: () => void;
  categories: Category[];
}

const Menu: React.FunctionComponent<Props> = ({
  isMenuOpen, hideMenu, isGameMode, categories,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const activeClass = isMenuOpen ? 'menu-active' : '';
  const gameModeClass = isGameMode ? 'menu-game-mode' : '';

  const [pageNumber, setPageNumber] = useState(2);

  const {
    loadedCategories,
    hasMore,
    loading,
  } = useLoadMoreCategories(pageNumber);

  const observer = useRef() as React.MutableRefObject<IntersectionObserver>;
  const lastCategoryElementRef = useCallback((node: HTMLAnchorElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      <div className={`menu ${activeClass} ${gameModeClass}`}>
        <div className="menu-nav-links">
          <NavLink className="menu-item" to="/" exact onClick={hideMenu}>Main page</NavLink>
          {[...categories, ...loadedCategories].map((category, index, array) => (
            <NavLink
              ref={array.length === index + 1 ? lastCategoryElementRef : null}
              className="menu-item"
              to={`/${category.id}`}
              onClick={hideMenu}
              key={category.id}
            >
              {category.name}
            </NavLink>
          ))}
          <NavLink className="menu-item" to="/statistics" onClick={hideMenu}>Statistics</NavLink>
        </div>
        <button className="login-button" type="button" onClick={() => setShowModal(true)}>Login</button>
        {showModal ? (
          <LoginModal onCloseModal={() => {
            setShowModal(false);
          }}
          />
        ) : ''}
      </div>
    </>
  );
};

export default Menu;
