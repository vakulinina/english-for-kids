import React, { useState, forwardRef } from 'react';
import { deleteWord } from '../api/api';
import BASE_URL from '../data/url';

interface Props {
  word: string;
  translation: string;
  sound: string;
  image: string;
  onUpdateWords: () => void;
}

const WordCard = forwardRef(({
  word, translation, sound, image, onUpdateWords,
}: Props, ref: React.ForwardedRef<HTMLLIElement>) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDeleteWordClick = async () => {
    await deleteWord(word);
    onUpdateWords();
  };

  return (
    <li className="admin-word-card" ref={ref}>
      {isEditMode
        ? (
          <>
            <label className="admin-word-card-input-label" htmlFor="word-input">
              Word:
              <input className="admin-word-card-input" defaultValue={word} id="word-input" />
            </label>
            <label className="admin-word-card-input-label" htmlFor="translation-input">
              Translation:
              <input className="admin-word-card-input" defaultValue={translation} id="translation-input" />
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
            <p>
              <b>Word: </b>
              {word}
            </p>
            <p>
              <b>Translation: </b>
              {translation}
            </p>
            <p>
              <b>Sound file: </b>
              {sound}

            </p>
            <p>
              <b>Image: </b>
              <img className="admin-word-card-img" src={image ? `${BASE_URL}/public/${image}` : './icons/no_image_backdrop.jpeg'} alt="word" />
            </p>
          </>
        )}
      <div className="admin-category-card-buttons">
        {isEditMode
          ? (
            <>
              <button className="card-button button-edit-mode" onClick={() => setIsEditMode(false)} type="button">Save</button>
              <button className="card-button button-edit-mode cancel-button" onClick={() => setIsEditMode(false)} type="button">Cancel</button>
            </>
          )
          : (
            <>
              <button className="card-button" onClick={() => setIsEditMode(true)} type="button">Change</button>
            </>
          )}
      </div>
      <button className="delete-button" onClick={handleDeleteWordClick} type="button">Delete</button>
    </li>
  );
});

export default WordCard;
