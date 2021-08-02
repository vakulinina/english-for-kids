import React, { useState } from 'react';
import { createWord } from '../api/api';

interface Props {
  categoryId: string;
  onUpdateWords: () => void;
}

const CreateWordCard: React.FunctionComponent<Props> = ({ categoryId, onUpdateWords }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const handleCreateClick = async () => {
    await createWord({ word, translation, categoryId });
    setIsEditMode(false);
    onUpdateWords();
  };

  return (
    <li className="admin-word-card">
      {isEditMode
        ? (
          <>
            <label className="admin-word-card-input-label" htmlFor="word-input">
              Word:
              <input className="admin-word-card-input" onChange={(e) => setWord(e.target.value)} id="word-input" />
            </label>
            <label className="admin-word-card-input-label" htmlFor="translation-input">
              Translation:
              <input className="admin-word-card-input" onChange={(e) => setTranslation(e.target.value)} id="translation-input" />
            </label>
            <label className="admin-word-card-input-label" htmlFor="sound-input">
              Sound:
              <input className="file-input" type="file" id="sound-input" />
            </label>
            <label className="admin-word-card-input-label" htmlFor="image-input">
              Image:
              <input className="file-input" type="file" id="image-input" />
            </label>
          </>
        )
        : (
          <>
            <h3>Add new word</h3>
            <button className="create-category-button" onClick={() => setIsEditMode(true)} type="button">
              Add word
              <img src="./icons/create.svg" alt="create" />
            </button>
          </>
        )}
      <div className="admin-category-card-buttons">
        {isEditMode
          ? (
            <>
              <button className="card-button button-edit-mode" onClick={handleCreateClick} type="button">Create</button>
              <button className="card-button button-edit-mode cancel-button" onClick={() => setIsEditMode(false)} type="button">Cancel</button>
            </>
          )
          : ''}
      </div>
    </li>
  );
};

export default CreateWordCard;
