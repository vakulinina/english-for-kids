import React, {
  useState, useRef, useCallback,
} from 'react';
import Category from '../models/category';
import CategoryCard from './admin-category-card';
import CreateCategoryCard from './admin-create-category-card';
import { useLoadMoreCategories } from '../common/custom-hooks';

interface Props {
  categories: Category[];
  onUpdateCategories: () => void;
  shouldUpdate: Record<string, unknown>;
}

const AdminCategories: React.FunctionComponent<Props> = (
  { categories, onUpdateCategories, shouldUpdate }: Props,
) => {
  const [pageNumber, setPageNumber] = useState(2);

  const {
    loadedCategories,
    hasMore,
    loading,
  } = useLoadMoreCategories(pageNumber, shouldUpdate);

  const observer = useRef() as React.MutableRefObject<IntersectionObserver>;
  const lastCategoryElementRef = useCallback((node: HTMLLIElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleCategoriesUpdate = () => {
    setPageNumber(2);
    onUpdateCategories();
  };

  return (
    <main>
      <ul className="admin-cards">
        {[...categories, ...loadedCategories].map((category: Category, index, array) => (
          <CategoryCard
            ref={array.length === index + 1 ? lastCategoryElementRef : null}
            title={category.name}
            key={category.id}
            categoryId={category.id}
            onUpdateCategories={handleCategoriesUpdate}
            words={category.words}
          />
        ))}
        <CreateCategoryCard onUpdateCategories={handleCategoriesUpdate} />
      </ul>
    </main>
  );
};

export default AdminCategories;
