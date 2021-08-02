import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  mistakes: number,
}

const FinalPage: React.FunctionComponent<Props> = ({ mistakes }: Props) => {
  const history = useHistory();

  useEffect(() => {
    const audio = mistakes ? new Audio('sounds/failure.mp3') : new Audio('sounds/success.mp3');
    audio.play();
    setTimeout(() => history.push('/'), 5000);
  }, []);

  return (
    <main>
      <p className="final-icon">{mistakes ? '😔' : '👍'}</p>
      <p className="final-text">{mistakes ? `You made ${mistakes} mistake(s)` : 'Good job!'}</p>
    </main>
  );
};

export default FinalPage;
