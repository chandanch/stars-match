import React from 'react';

const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
      >
        Game {props.gameStatus}
      </div>
      <button onClick={props.onBtnClick}>Play Again</button>
    </div>
  );
};

export default PlayAgain;
