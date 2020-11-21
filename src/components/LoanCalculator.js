import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Hits external API to calculate estimated loan payment based on principal
 * (amount borrowed) interest rate, and length of loan.
 */
const LoanCalculator = (props) => {
  const { principal, interest, months } = props;
  const [monthlyPayment, setMonthlyPayment] = useState();

  useEffect(() => {
    const getEstimatedPayment = async () => {
      try {
        const result = await axios.post(
          'https://api.wetradeup.com/calculator',
          {
            principal: principal,
            interest: interest,
            months: months,
          }
        );

        const { payment } = result.data;
        setMonthlyPayment(payment);
      } catch (e) {
        console.log(e);
      }
    };

    getEstimatedPayment();
  }, [principal, interest, months]);

  if (monthlyPayment === undefined) {
    return <div />;
  }

  return (
    <div>
      To pay back ${principal} over {months} months at {interest * 100}%
      interest, your monthly payment will be ${monthlyPayment}
    </div>
  );
};

LoanCalculator.propTypes = {
  /* The amount borrowed */
  principal: PropTypes.string.isRequired,
  /* The interest rate */
  interest: PropTypes.string.isRequired,
  /* The default term for the loan calculator to display */
  months: PropTypes.string.isRequired,
};

export default LoanCalculator;
