import React from 'react';

const ISACalculator = (props) => {
  const { borrowed, cap, length, take, threshold, annual_salary } = props;

  return (
    <div>
      <div>Income share: {take}</div>
      <div>ISA length: {length}</div>
    </div>
  );
};

export default ISACalculator;
