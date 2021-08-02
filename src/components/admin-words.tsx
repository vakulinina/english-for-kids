import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import WordCard from './admin-word-card';
import { getCardsByCategory } from '../api/api';
import Card from '../models/card';
import CreateWordCard from './admin-create-word-card';
import { useLoadMoreWords } from '../common/custom-hooks';

interface UrlParams {
  category: string,
}

const AdminWords: React.FunctionComponent = () => {
  const { category } = useParams() as UrlParams;
  const [shouldUpdate, setShouldUpdate] = useState({});
  const [pageNumber, setPageNumber] = useState(2);
  const [words, setWords] = useState([] as Card[]);

  useEffect(() => {
    getCardsByCategory(category, 1).then((data) => setWords(data));
  }, [shouldUpdate]);

  const {
    loadedWords,
    hasMore,
    loading,
  } = useLoadMoreWords(category, pageNumber, shouldUpdate);

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

  const handleWordsUpdate = () => {
    setPageNumber(2);
    setShouldUpdate({});
  };

  return (
    <main>
      <h2 className="admin-words-title">
        {`Category: ${loadedWords.length > 0 ? loadedWords[0].category : category.split('-').join(' ')}`}
      </h2>
      <ul className="admin-cards">
        {[...words, ...loadedWords].map((word, index, array) => (
          <WordCard
            ref={array.length === index + 1 ? lastWordElementRef : null}
            word={word.word}
            key={word.word}
            translation={word.translation}
            sound={`${word.word}.mp3`}
            image={word.image}
            onUpdateWords={handleWordsUpdate}
          />
        ))}
        <CreateWordCard categoryId={category} onUpdateWords={handleWordsUpdate} />
      </ul>
    </main>
  );
};

export default AdminWords;
