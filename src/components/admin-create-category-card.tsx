import React, { useState } from 'react';
import { createCategory } from '../api/api';

interface Props {
  onUpdateCategories: () => void;
}

const CreateCategoryCard: React.FunctionComponent<Props> = ({
  onUpdateCategories,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleCreateCLick = async () => {
    await createCategory({ name: categoryName });
    setIsEditMode(false);
    onUpdateCategories();
  };

  return (
    <li className="admin-category-card">
      {isEditMode
        ? (
          <label className="admin-category-card-input-label" htmlFor="category-input">
            Category Name:
            <input className="admin-category-card-input" onChange={(e) => setCategoryName(e.target.value)} id="category-input" />
          </label>
        )
        : (
          <>
            <p className="admin-category-card-title">Create new Category</p>
            <button className="create-category-button" onClick={() => setIsEditMode(true)} type="button">
              Create
              <img src="./icons/create.svg" alt="create" />
            </button>
          </>
        )}
      <div className="admin-category-card-buttons">
        {isEditMode
          ? (
            <>
              <button className="card-button button-edit-mode" onClick={handleCreateCLick} type="button">Create</button>
              <button className="card-button button-edit-mode cancel-button" onClick={() => setIsEditMode(false)} type="button">Cancel</button>
            </>
          )
          : ''}
      </div>
    </li>
  );
};

export default CreateCategoryCard;
