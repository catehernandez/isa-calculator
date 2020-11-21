import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

import ErrMessage from './components/shared/ErrMessage';
import Loading from './components/shared/Loading';
import ISACalculator from './components/ISACalculator';
import LoanCalculator from './components/LoanCalculator';

/**
 * Fetch list of programs. Allow student to select a program to view its terms.
 */
const App = () => {
  const [terms, setTerms] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [hasErr, setHasErr] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await axios('https://api.wetradeup.com/terms');

        setTerms(result.data);
      } catch {
        setHasErr(true);
      }
    };

    fetchTerms();
  }, []);

  if (hasErr) {
    return <ErrMessage />;
  }

  //if there is not an err, and data has not yet been fetched
  if (terms === null) {
    return <Loading />;
  }

  /* React-select configuration */
  const programs = Object.keys(terms);

  // Format programs as needed to populate react-select
  const options = programs.map((program) => ({
    value: program,
    label: program,
  }));

  // Set selected program onChange in react-select dropdown
  const selectProgram = (option) => {
    const program = option.value;
    setSelectedProgram(terms[program]);
  };

  if (selectedProgram === null) {
    return (
      <div>
        I want to be a
        <Select options={options} onChange={selectProgram} />
      </div>
    );
  }

  const {
    isa_cap,
    isa_length,
    isa_take,
    isa_threshold,
    loan_interest,
    tuition,
    typical_salary,
  } = selectedProgram;

  return (
    <React.Fragment>
      <div>
        I want to be a
        <Select options={options} onChange={selectProgram} />
      </div>
      <div>
        <h3>Monthly ISA Payments</h3>
        <ISACalculator
          borrowed={Number(tuition)}
          cap={Number(isa_cap)}
          length={Number(isa_length)}
          take={Number(isa_take)}
          threshold={Number(isa_threshold)}
          avgAnnualSalary={Number(typical_salary)}
        />

        <h3>Monthly Loan Payments</h3>
        <LoanCalculator
          principal={tuition}
          interest={loan_interest}
          months={isa_length}
        />
      </div>
    </React.Fragment>
  );
};

export default App;
