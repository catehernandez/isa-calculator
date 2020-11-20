import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';

/**
 * Fetch program names and terms from API. Allow user to choose a program and
 * click to view program terms on next page.
 */
const Home = () => {
  const [terms, setTerms] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      const result = await axios('https://api.wetradeup.com/terms');

      setTerms(result.data);
    };

    fetchTerms();
  }, []);

  //if data has not yet been fetched, return empty div
  if (terms === null) {
    return <div />;
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

  return (
    <React.Fragment>
      <div>
        I want to be a
        <Select options={options} onChange={selectProgram} />
      </div>
      <Link to={{ pathname: '/terms', state: { program: selectedProgram } }}>
        See my terms
      </Link>
    </React.Fragment>
  );
};

export default Home;
