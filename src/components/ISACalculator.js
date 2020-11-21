import React, { useEffect, useState } from 'react';
import Slider from './shared/Slider';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';

const ISACalculator = (props) => {
  const { avgAnnualSalary, borrowed, cap, length, take, threshold } = props;
  const maxPayment = borrowed * cap;

  //salary
  const [salary, setSalary] = useState(avgAnnualSalary);
  const handleSalaryChange = (event, newSalary) => {
    setSalary(newSalary);
  };

  //employed
  const [isEmployed, setIsEmployed] = useState(true);
  const handleEmploymentChange = (event) => {
    setIsEmployed(event.target.checked);
  };

  //montly payments
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  useEffect(() => {
    //or if unemployed
    if (salary <= threshold || !isEmployed) {
      setMonthlyPayment(0);
    } else {
      const payment = (salary * take) / 12;
      setMonthlyPayment(payment.toFixed(2));
    }
  }, [isEmployed, salary, take, threshold]);

  /* UI */
  //marks for salary slider; max annual to display on slider
  const marks = [{ value: avgAnnualSalary }];
  //student will me the capped return in exactly the ISA length at this salary
  const maxTotalSalary = maxPayment / take;
  const maxAnnualSalary = Number((maxTotalSalary / (length / 12)).toFixed(0));
  //format take as percentage
  const incomeShare = (take * 100).toFixed(1);

  return (
    <div>
      <div>
        Employed
        <Switch
          checked={isEmployed}
          color="primary"
          onChange={handleEmploymentChange}
        />
      </div>
      <div>
        <p>Annual Salary</p>
        <Slider
          aria-label="salary-slider"
          disabled={!isEmployed}
          min={threshold}
          max={maxAnnualSalary}
          marks={marks}
          onChange={handleSalaryChange}
          step={500}
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