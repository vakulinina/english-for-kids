import Card from '../models/card';
import Category from '../models/category';
import BASE_URL from '../data/url';

const API_URL = `${BASE_URL}/api`;

const getCategories = async (pageNumber: number): Promise<Category[]> => {
  const url = `${API_URL}/categories?page=${pageNumber}`;
  const response = await fetch(url, { mode: 'cors' });
  const categories = await response.json();
  return categories;
};

const deleteCategory = async (id: string): Promise<void> => {
  const url = `${API_URL}/categories/${id}`;
  await fetch(url, { method: 'DELETE' });
};

const getCardsByCategory = async (id: string, pageNumber: number): Promise<Card[]> => {
  const url = `${API_URL}/categories/${id}/words?page=${pageNumber}`;
  const response = await fetch(url);
  const cards = await response.json();
  return cards;
};

const updateCategory = async (category: string, body: { name: string }): Promise<void> => {
  const url = `${API_URL}/categories/${category}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 200) {
    return Promise.reject(await response.json());
  }
  return Promise.resolve();
};

const createCategory = async (category: { name: string }): Promise<void> => {
  const url = `${API_URL}/categories`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  if (response.status !== 200) {
    return Promise.reject(await response.json());
  }
  return Promise.resolve();
};

const createWord = async (word: {
  word: string, translation: string, categoryId: string
}): Promise<void> => {
  const url = `${API_URL}/words`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (response.status !== 200) {
    return Promise.reject(await response.json());
  }
  return Promise.resolve();
};

const deleteWord = async (word: string): Promise<void> => {
  const url = `${API_URL}/words/${word}`;
  await fetch(url, { method: 'DELETE' });
};

const login = async (user: { username: string, password: string }): Promise<void> => {
  const url = `${API_URL}/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status !== 200) {
    return Promise.reject(await response.json());
  }
  return Promise.resolve();
};

export {
  getCategories,
  getCardsByCategory,
  deleteCategory,
  updateCategory,
  createCategory,
  createWord,
  deleteWord,
  login,
};
