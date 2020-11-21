import React from 'react';
import { useLocation } from 'react-router-dom';

import ISACalculator from '../components/ISACalculator';
import LoanCalculator from '../components/LoanCalculator';

/**
 * Displays the terms for the program selected on the SelectProgram page.
 *
 * Renders ISACalculator and LoanCalculator so that students can manipulate
 * values to see different payments.
 */
const Terms = () => {
  //selected program passed through react router from previous page
  //TODO: Err. Handling--what if user goes to page without visiting previous page?
  let location = useLocation();
  const { program } = location.state;

  const {
    isa_cap,
    isa_length,
    isa_take,
    isa_threshold,
    loan_interest,
    tuition,
    typical_salary,
  } = program;

  return (
    <div>
      <p>Your payment plan if you borrow ${tuition}</p>
      <ISACalculator
        borrowed={Number(tuition)}
        cap={Number(isa_cap)}
        length={Number(isa_length)}
        take={Number(isa_take)}
        threshold={Number(isa_threshold)}
        avgAnnualSalary={Number(typical_salary)}
      />

      <LoanCalculator
        principal={tuition}
        interest={loan_interest}
        months={isa_length}
      />
    </div>
  );
};

export default Terms;
