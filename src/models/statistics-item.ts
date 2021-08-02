import Word from './word';

interface StatsItem extends Word {
  clicks: number,
  correct: number,
  wrong: number,
  percent: number,
}

export default StatsItem;
