import React from 'react';

interface Props {
  isGameStarted: boolean,
  currentAudio: HTMLAudioElement | null,
  handleStartClick: () => void,
}

const GameButton: React.FunctionComponent<Props> = (props: Props) => {
  const { isGameStarted, currentAudio, handleStartClick } = props;

  return (
    <button
      className="game-button"
      type="button"
      onClick={() => {
        if (isGameStarted) {
          currentAudio?.play();
        } else {
          handleStartClick();
        }
      }}
    >
      {isGameStarted ? 'repeat' : 'start'}
    </button>
  );
};

export default GameButton;
