import React, { useState, useEffect } from 'react';
import StatisticsButtons from './statistics-buttons';
import cards from '../data/cards.json';
import Word from '../models/word';
import StatsItem from '../models/statistics-item';

const setLocalStorage = (): void => {
  const words: Word[] = Object.keys(cards).flatMap((key: string) => cards[key]);

  words.sort((a, b) => (a.word > b.word ? 1 : -1));
  const statistics = words.map(({
    word, translation, category, image,
  }) => ({
    word,
    translation,
    category,
    image,
    clicks: 0,
    correct: 0,
    wrong: 0,
    percent: 0,
  }));

  localStorage.setItem('statistics', JSON.stringify(statistics));
};

const updateStatistics = (word: string, category: 'clicks' | 'correct' | 'wrong'): void => {
  const statistics: StatsItem[] = JSON.parse(localStorage.getItem('statistics') as string);
  const statsItem = statistics.find((item) => item.word === word) as StatsItem;

  switch (category) {
    case 'clicks':
      statsItem.clicks += 1;
      break;
    case 'correct':
      statsItem.correct += 1;
      break;
    case 'wrong':
      statsItem.wrong += 1;
      break;
    default:
      break;
  }

  statsItem.percent = statsItem.wrong + statsItem.correct > 0
    ? +((statsItem.correct * 100) / (statsItem.wrong + statsItem.correct)).toFixed(1) : 0;

  localStorage.setItem('statistics', JSON.stringify(statistics));
};

const createDifficultWordsList = () => {
  const data: StatsItem[] = JSON.parse(localStorage.getItem('statistics') as string);
  data.sort((a, b) => (a.wrong > b.wrong ? -1 : 1));
  const array = [];
  for (let i = 0; i < 8; i += 1) {
    if (data[i].wrong > 0) array.push(data[i]);
  }
  localStorage.setItem('difficult-words', JSON.stringify(array));
};

const sortTable = (field: keyof StatsItem, direction: 'ascending' | 'descending') => {
  const data: StatsItem[] = JSON.parse(localStorage.getItem('statistics') as string);
  if (direction === 'ascending') {
    data.sort((a, b) => (a[field] > b[field] ? -1 : 1));
  } else {
    data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }
  localStorage.setItem('statistics', JSON.stringify(data));
};

const Statistics: React.FunctionComponent = () => {
  const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('statistics') as string));

  useEffect(() => {
    if (localStorage.getItem('statistics')) {
      sortTable('word', 'descending');
      createDifficultWordsList();
      setStorage(JSON.parse(localStorage.getItem('statistics') as string));
    }
  }, []);

  const handleResetClick = () => {
    const data = JSON.parse(localStorage.getItem('statistics') as string);
    const resetArray = data.map((item: StatsItem) => ({
      word: item.word,
      translation: item.translation,
      category: item.category,
      clicks: 0,
      correct: 0,
      wrong: 0,
      percent: 0,
      image: item.image,
    }));
    localStorage.setItem('statistics', JSON.stringify(resetArray));
    localStorage.setItem('difficult-words', JSON.stringify([]));
    setStorage(JSON.parse(localStorage.getItem('statistics') as string));
  };

  const handleHeaderClick = ({ target }: React.MouseEvent<HTMLTableRowElement>) => {
    const headCells = document.querySelectorAll('th');
    headCells.forEach((headCell) => {
      const currentCell = headCell;
      if (currentCell.innerText.match(/↓|↑/)) {
        currentCell.innerText = headCell.innerText.substring(2);
      }
    });

    if (!(target instanceof HTMLElement)) return;
    sortTable(target.dataset.value as keyof StatsItem, target.dataset.direction as 'ascending' | 'descending');

    const arrow = target.dataset.direction === 'ascending' ? '↓' : '↑';
    const cell = target;
    cell.dataset.direction = target.dataset.direction === 'ascending' ? 'descending' : 'ascending';

    let title;
    switch (target.dataset.value) {
      case 'word':
        title = document.querySelector('th:first-child');
        break;
      case 'translation':
        title = document.querySelector('th:nth-child(2)');
        break;
      case 'category':
        title = document.querySelector('th:nth-child(3)');
        break;
      case 'clicks':
        title = document.querySelector('th:nth-child(4)');
        break;
      case 'correct':
        title = document.querySelector('th:nth-child(5)');
        break;
      case 'wrong':
        title = document.querySelector('th:nth-child(6)');
        break;
      case 'percent':
        title = document.querySelector('th:last-child');
        break;
      default:
        break;
    }
    if (title) title.innerHTML = `${arrow} ${title.innerHTML}`;
    setStorage(JSON.parse(localStorage.getItem('statistics') as string));
  };

  return (
    <main className="statistics">
      <div className="statistics-table-container">
        <table className="statistics-table">
          <thead>
            <tr onClick={handleHeaderClick}>
              <th data-value="word" data-direction="ascending">↑ Word</th>
              <th data-value="translation" data-direction="descending">Translation</th>
              <th data-value="category" data-direction="descending">Category</th>
              <th data-value="clicks" data-direction="descending">Clicks</th>
              <th data-value="correct" data-direction="descending">Correct</th>
              <th data-value="wrong" data-direction="descending">Wrong</th>
              <th data-value="percent" data-direction="descending">Correct %</th>
            </tr>
          </thead>
          <tbody>
            {storage.map((item: StatsItem) => (
              <tr key={item.word}>
                <td>{item.word}</td>
                <td>{item.translation}</td>
                <td>{item.category}</td>
                <td>{item.clicks}</td>
                <td>{item.correct}</td>
                <td>{item.wrong}</td>
                <td>{item.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StatisticsButtons onClickReset={handleResetClick} />
    </main>
  );
};

export default Statistics;
export { updateStatistics, setLocalStorage };
