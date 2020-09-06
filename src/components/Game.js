import React, { useState, useEffect } from 'react';
import StarsDisplay from './StarDisplay';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';
import utils from '../math-utils';

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  });

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (number) => !newCandidateNums.includes(number),
      );

      // set star
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, candidateNums, availableNums, secondsLeft, setGameState };
};

// STAR MATCH - Starting Template
const Game = (props) => {
  const {
    stars,
    candidateNums,
    availableNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  let gameStatus =
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };
  // [1, 2, 3, 4] [3]

  const onNumberClick = (number, currentStatus) => {
    console.log(number, currentStatus);

    if (gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }

    // candidate nums
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((candidateNumber) => candidateNumber !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>

      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onBtnClick={props.onStartGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>

        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>

      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;