import React, { useState, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteCategory, updateCategory } from '../api/api';

interface Props {
  title: string;
  categoryId: string;
  words: number;
  onUpdateCategories: () => void;
}

const CategoryCard = forwardRef(({
  title, categoryId, onUpdateCategories, words,
}: Props, ref: React.ForwardedRef<HTMLLIElement>) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleDeleteClick = async () => {
    await deleteCategory(categoryId);
    onUpdateCategories();
  };

  const handleSaveCLick = async () => {
    await updateCategory(categoryId, { name: categoryName });
    setIsEditMode(false);
    onUpdateCategories();
  };

  return (
    <li className="admin-category-card" ref={ref}>
      {isEditMode
        ? (
          <label className="admin-category-card-input-label" htmlFor="category-input">
            Category Name:
            <input className="admin-category-card-input" defaultValue={title} onChange={(e) => setCategoryName(e.target.value)} id="category-input" />
          </label>
        )
        : (
          <>
            <p className="admin-category-card-title">{title}</p>
            <p>{`WORDS: ${words}`}</p>
          </>
        )}
      <div className="admin-category-card-buttons">
        {isEditMode
          ? (
            <>
              <button className="card-button button-edit-mode" onClick={handleSaveCLick} type="button">Save</button>
              <button className="card-button button-edit-mode cancel-button" onClick={() => setIsEditMode(false)} type="button">Cancel</button>
            </>
          )
          : (
            <>
              <button className="card-button" onClick={() => setIsEditMode(true)} type="button">Update</button>
              <NavLink to={`/admin/${categoryId}/words`}><button className="card-button" type="button">Add word</button></NavLink>
            </>
          )}
      </div>
      <button className="delete-button" onClick={handleDeleteClick} type="button">Delete</button>
    </li>
  );
});

export default CategoryCard;
