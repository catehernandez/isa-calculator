import React, { useEffect, useState } from 'react';
import Slider from './shared/Slider';
import PropTypes from 'prop-types';

const ISACalculator = (props) => {
  const { avgAnnualSalary, borrowed, cap, length, take, threshold } = props;

  //salary
  const [salary, setSalary] = useState(avgAnnualSalary);
  //marks for salary slider
  const marks = [{ value: avgAnnualSalary }];
  const handleSalaryChange = (event, newSalary) => {
    setSalary(newSalary);
  };

  //montly payments
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  useEffect(() => {
    //or if unemployed
    if (salary <= threshold) {
      setMonthlyPayment(0);
    } else {
      const payment = (salary * take) / 12;
      setMonthlyPayment(payment.toFixed(2));
    }
  }, [salary, take]);

  //format take as percentage
  const incomeShare = (take * 100).toFixed(1);

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
      <div>
        With a <b>{incomeShare}% income share</b> for <b>{length} months</b>
      </div>
      <div>Monthly Payment: {monthlyPayment}</div>
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
