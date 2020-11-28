import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ErrMessage from './shared/ErrMessage';
import Loading from '../components/shared/Loading';
import toUSD from '../utils/toUSD';

import './calculator.scss';

/**
 * Hits external API to calculate estimated loan payment based on principal
 * (amount borrowed) interest rate, and length of loan.
 */
const LoanCalculator = (props) => {
  const { principal, interest, months } = props;
  const principalInUSD = toUSD(principal);

  const [monthlyPayment, setMonthlyPayment] = useState();
  const [hasError, setHasError] = useState(false);
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
      } catch {
        setHasError(true);
      }
    };

    getEstimatedPayment();
  }, [principal, interest, months]);

  if (hasError) {
    return <ErrMessage />;
  }

  return (
    <div className="calculator calculator--loan">
      <h3 className="calculator__title">Monthly Loan Payments</h3>
      <div className="calculator__box" role="presentation">
        <div className="calculator__container">
          To pay back <b>{principalInUSD}</b> over <b>{months} months</b> at{' '}
          <b>{Number(interest * 100).toFixed(1)}%</b> interest:
          <div className="monthly-payment__container">
            Monthly payment
            {monthlyPayment ? (
              <div className="monthly-payment monthly-payment--loan">
                ${monthlyPayment}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
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
