import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Category from '../models/category';
import BASE_URL from '../data/url';
import { useLoadMoreCategories } from '../common/custom-hooks';

interface Props {
  isGameMode: boolean;
  categories: Category[];
}

const Main: React.FunctionComponent<Props> = ({ isGameMode, categories }: Props) => {
  const gameModeClass = isGameMode ? 'main-card-game' : '';
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
    <main className="main-container">
      {[...categories, ...loadedCategories].map(({ id, image, name }: Category, index, array) => (
        <Link
          ref={array.length === index + 1 ? lastCategoryElementRef : null}
          className={`main-card ${gameModeClass}`}
          to={`/${id}`}
          key={id}
        >
          <img src={image ? `${BASE_URL}/public/${image}` : './icons/no_image_backdrop.jpeg'} alt={name} />
          {name}
        </Link>
      ))}
    </main>
  );
};

export default Main;
