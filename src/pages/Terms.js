import React from 'react';
import { useLocation } from 'react-router-dom';

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

  console.log('selected program', program);

  return <div>terms</div>;
};

export default Terms;
