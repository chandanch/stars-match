import React, { useState } from 'react';

import Game from './Game';

const useResetGame = (initgameId) => {
  const [gameId, setGameId] = useState(initgameId);

  const resetGameId = () => {
    setGameId(gameId + 1);
  };

  return { gameId, resetGameId };
};

const StarMatch = () => {
  const { gameId, resetGameId } = useResetGame(1);
  return <Game key={gameId} onStartGame={resetGameId} />;
};

// const rootElement = document.getElementById("root");

// ReactDOM.render(<StarMatch />, rootElement);

export function App() {
  return <StarMatch />;
}
