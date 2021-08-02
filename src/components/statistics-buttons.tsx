import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  onClickReset: () => void,
}

const StatisticsButtons: React.FunctionComponent<Props> = ({ onClickReset }: Props) => {
  const history = useHistory();

  return (
    <div className="statistics-buttons">
      <button type="button" className="repeat-words-button" onClick={() => history.push('/difficult-words')}>Repeat difficult words</button>
      <button type="button" className="reset-statistics-button" onClick={onClickReset}>Reset</button>
    </div>
  );
};

export default StatisticsButtons;
