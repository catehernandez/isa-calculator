import React, { useState } from 'react';
import Slider from './shared/Slider';
import PropTypes from 'prop-types';

const ISACalculator = (props) => {
  const { avgAnnualSalary, borrowed, cap, length, take, threshold } = props;

  const [salary, setSalary] = useState(avgAnnualSalary);
  const handleSalaryChange = (event, newSalary) => {
    setSalary(newSalary);
  };

  //marks for salary slider
  const marks = [{ value: avgAnnualSalary }];

  return (
    <div>
      <div>
        <p>Annual Salary</p>
        <Slider
          aria-label="salary-slider"
          min={0}
          max={500000}
          marks={marks}
          onChange={handleSalaryChange}
          step={250}
          value={salary}
          valueLabelDisplay="on"
        />
      </div>
      <div>Income share: {take}</div>
      <div>ISA length: {length}</div>
    </div>
  );
};

ISACalculator.propTypes = {
  avgAnnualSalary: PropTypes.number.isRequired,
  borrowed: PropTypes.number.isRequired,
  /**
   * The multiple of the cap and the amount borrowed is the guaranteed maximum
   * amount that a student will pay back.
   */
  cap: PropTypes.number.isRequired,
  /** The percent of their pre-tax income that the student will pay */
  take: PropTypes.number.isRequired,
  /** Students payment goes to 0 if their salary is at the threshold or less. */
  threshold: PropTypes.number.isRequired,
};

export default ISACalculator;
