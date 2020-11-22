import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

import ErrMessage from './components/shared/ErrMessage';
import CustomSelectStyles from './components/shared/CustomSelectStyles';
import Loading from './components/shared/Loading';
import ISACalculator from './components/ISACalculator';
import LoanCalculator from './components/LoanCalculator';
import toUSD from './utils/toUSD';

import './App.css';
import customSelectStyles from './components/shared/CustomSelectStyles';

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
      <div className="app__container">
        I want to be a{' '}
        <div className="react-select__inline-container">
          <Select
            options={options}
            onChange={selectProgram}
            styles={customSelectStyles}
          />
        </div>
      </div>
    );
  }

  //extract these variables if selectedProgram has been set
  const {
    isa_cap,
    isa_length,
    isa_take,
    isa_threshold,
    loan_interest,
    tuition,
    typical_salary,
  } = selectedProgram;

  //formatted tuition
  const tuitionInUSD = toUSD(tuition);

  return (
    <div className="app__container">
      <div>
        I want to be a{' '}
        <div className="react-select__inline-container">
          <Select
            options={options}
            onChange={selectProgram}
            styles={customSelectStyles}
          />
        </div>
        <p>
          The average tuition for this program is <b>{tuitionInUSD}</b>. If you
          borrow <b>{tuitionInUSD}</b>, your monthly payments would be:
        </p>
      </div>

      <div className="calculators__container">
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
    </div>
  );
};

export default App;
