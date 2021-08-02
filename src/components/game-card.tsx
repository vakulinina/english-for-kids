/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, forwardRef } from 'react';
import { updateStatistics } from './statistics';
import BASE_URL from '../data/url';

interface Props {
  image: string,
  word: string,
  translation: string,
  isGameMode: boolean
}

const GameCard = forwardRef(({
  image, word, translation, isGameMode,
}: Props, ref: React.ForwardedRef<HTMLLIElement>) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const sound = new Audio(`${BASE_URL}/public/sounds/${word}.mp3`);
  const handleCardClick = () => {
    if (!isFlipped && !isGameMode) {
      updateStatistics(`${word}`, 'clicks');
      sound.play();
    }
  };

  const flippedClass = isFlipped ? 'flipped' : '';
  const gameModeImageClass = isGameMode ? 'image-container-game' : '';
  const imageUrl = `${BASE_URL}/public/${image}`;
  const noImageSrc = './icons/no_image_backdrop.jpeg';

  return (
    <li
      ref={ref}
      className="card"
      onClick={handleCardClick}
      onMouseLeave={() => setIsFlipped(false)}
      data-word={word}
    >
      <div className={`content ${flippedClass}`}>
        <div className="front">
          <div className={`image-container ${gameModeImageClass}`}>
            <img className="card-image" src={image ? imageUrl : noImageSrc} alt="" />
          </div>
          <p className="word">{word}</p>
          <button
            className="flip-button"
            onClick={(e) => {
              setIsFlipped(true);
              e.stopPropagation();
            }}
          />
        </div>
        <div className="back">
          <div className="image-container">
            <img className="card-image" src={image ? imageUrl : noImageSrc} alt="" />
          </div>
          <p className="word">{translation}</p>
        </div>
      </div>
    </li>
  );
});

export default GameCard;
