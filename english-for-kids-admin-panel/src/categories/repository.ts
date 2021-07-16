import cards from './cards';
import Category from './category';
import Card from './card';

const categories: Category[] = Object.keys(cards).map((key) => ({
  id: key,
  name: cards[key][0].category,
  image: cards[key][0].image,
  words: cards[key].length,
}));

const getCategories = (): Promise<Category[]> => Promise.resolve(categories);

const getCategoryById = (id: string): Promise<Category | undefined> => {
  const category = categories.find((cat) => cat.id === id);
  return Promise.resolve(category);
};

const deleteCategory = (id: string): Promise<void> => {
  const categoryIndex = categories.findIndex((cat) => cat.id === id);
  if (categoryIndex < 0) return Promise.reject(new Error('Category not found'));
  categories.splice(categoryIndex, 1);
  return Promise.resolve();
};

const createCategory = (data: Category): Promise<Category> => {
  const isExists = categories.findIndex((cat) => cat.name === data.name) >= 0;
  if (isExists) {
    return Promise.reject(new Error('Category already exists'));
  }
  const categoryId = data.name.toLowerCase().split(' ').join('-');
  const newCategory = {
    id: categoryId,
    name: data.name,
    words: 0,
  };
  cards[categoryId] = [];
  categories.push(newCategory);
  return Promise.resolve(newCategory);
};

const updateCategory = (categoryId: string, newName: string): Promise<void> => {
  const category = categories.find((currentCategory) => currentCategory.id === categoryId);
  if (!category) return Promise.reject(new Error('Category not found'));
  category.name = newName;
  return Promise.resolve();
};

const getCardsByCategory = (id: string): Promise<Card[]> => Promise.resolve(cards[id]);

export {
  getCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  getCardsByCategory,
  updateCategory,
};
