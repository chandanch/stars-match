import React from 'react';
import utils from '../math-utils'

const StarsDisplay = (props) => {
  return (
    <>
      {utils.range(1, props.count).map((star) => (
        <div key={star} className="star" />
      ))}
    </>
  );
};

export default StarsDisplay;
