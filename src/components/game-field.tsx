import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameCard from './game-card';
import GameButton from './game-button';
import { updateStatistics } from './statistics';
import { getCardsByCategory } from '../api/api';
import Card from '../models/card';
import { useLoadMoreWords } from '../common/custom-hooks';

interface UrlParams {
  category: string,
}

interface Props {
  isGameMode: boolean,
  countMistakes: (mistakes: number) => void,
}

const GameField: React.FunctionComponent<Props> = ({ isGameMode, countMistakes }: Props) => {
  const { category } = useParams() as UrlParams;
  const history = useHistory();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null as HTMLAudioElement | null);
  const [pageNumber, setPageNumber] = useState(2);
  const [cards, setCards] = useState([] as Card[]);

  useEffect(() => {
    if (category === 'difficult-words') {
      setCards(JSON.parse(localStorage.getItem('difficult-words') as string));
    } else {
      getCardsByCategory(category, 1).then((cardsByCategory) => setCards(cardsByCategory));
    }
  }, [category]);

  const {
    loadedWords,
    hasMore,
    loading,
  } = useLoadMoreWords(category, pageNumber);

  const observer = useRef() as React.MutableRefObject<IntersectionObserver>;
  const lastWordElementRef = useCallback((node: HTMLLIElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const words = cards.map(({ word }) => word).sort(() => Math.random() - 0.5);
  let currentWordIndex = 0;
  let mistakes = 0;

  useEffect(() => {
    setIsGameStarted(false);
  }, [category]);

  const playWord = () => {
    const audio = new Audio(`./sounds/${words[currentWordIndex]}.mp3`);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleGameCardClick = (card: HTMLLIElement) => {
    const scoreField = document.querySelector('.game-score') as HTMLDivElement;
    const star = document.createElement('img') as HTMLImageElement;
    star.classList.add('score-star');

    if (words[currentWordIndex] === card.dataset.word) {
      card.classList.add('disabled');
      new Audio('./sounds/correct.mp3').play();
      updateStatistics(`${words[currentWordIndex]}`, 'correct');

      star.src = './icons/star-correct.png';
      scoreField.append(star);

      if (currentWordIndex < words.length - 1) {
        currentWordIndex += 1;
        setTimeout(playWord, 1000);
      } else {
        countMistakes(mistakes);
        setTimeout(() => {
          history.push('/final-page');
          scoreField.innerHTML = '';
        }, 1000);
      }
    } else {
      mistakes += 1;
      new Audio('./sounds/error.mp3').play();
      updateStatistics(`${words[currentWordIndex]}`, 'wrong');

      star.src = './icons/star-error.png';
      scoreField.append(star);
    }
  };

  const startGame = () => {
    const gameCards = document.querySelectorAll('.card') as NodeListOf<HTMLLIElement>;
    setIsGameStarted(true);
    gameCards.forEach((card) => card.addEventListener('click', () => handleGameCardClick(card)));
    playWord();
  };

  return (
    <main className="game-field">
      <ul className="cards">
        {[...cards, ...loadedWords].map(({ image, word, translation }, index, array) => (
          <GameCard
            ref={array.length === index + 1 ? lastWordElementRef : null}
            image={image}
            word={word}
            translation={translation}
            key={word}
            isGameMode={isGameMode}
          />
        ))}
      </ul>
      {isGameMode ? <GameButton isGameStarted={isGameStarted} currentAudio={currentAudio} handleStartClick={startGame} /> : ''}
    </main>
  );
};

export default GameField;
