import { useEffect, useState } from 'react';
import { getCategories, getCardsByCategory } from '../api/api';
import Category from '../models/category';
import Card from '../models/card';

const useLoadMoreCategories = (pageNumber: number, shouldUpdate?: Record<string, unknown>): {
  loading: boolean, loadedCategories: Category[], hasMore: boolean,
} => {
  const [loading, setLoading] = useState(true);
  const [loadedCategories, setLoadedCategories] = useState([] as Category[]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoadedCategories([]);
  }, [shouldUpdate]);

  useEffect(() => {
    setLoading(true);
    getCategories(pageNumber)
      .then((data) => {
        setLoadedCategories((prevCategories) => [...prevCategories, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      });
  }, [pageNumber]);

  return {
    loading, loadedCategories, hasMore,
  };
};

const useLoadMoreWords = (
  category: string, pageNumber: number, shouldUpdate?: Record<string, unknown>,
): {
  loading: boolean, loadedWords: Card[], hasMore: boolean,
} => {
  const [loading, setLoading] = useState(true);
  const [loadedWords, setLoadedWords] = useState([] as Card[]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoadedWords([]);
  }, [shouldUpdate]);

  useEffect(() => {
    setLoading(true);
    getCardsByCategory(category, pageNumber)
      .then((data) => {
        setLoadedWords((prevWords) => [...prevWords, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      });
  }, [pageNumber]);

  return {
    loading, loadedWords, hasMore,
  };
};

export { useLoadMoreCategories, useLoadMoreWords };
