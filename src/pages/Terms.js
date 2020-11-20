import React from 'react';
import { useLocation } from 'react-router-dom';

import ISACalculator from '../components/ISACalculator';

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
        borrowed={tuition}
        cap={isa_cap}
        length={isa_length}
        take={isa_take}
        threshold={isa_threshold}
        annual_salary={typical_salary}
      />
    </div>
  );
};

export default Terms;
