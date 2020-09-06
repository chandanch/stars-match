import React from 'react';

const PlayNumber = (props) => {
  return (
    <button
      className="number"
      onClick={() => props.onClick(props.number, props.status)}
      style={{ backgroundColor: colors[props.status] }}
    >
      {props.number}
    </button>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default PlayNumber;
