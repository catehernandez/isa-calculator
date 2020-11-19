import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';

/**
 * Homepage is where program data is fetched. User can select a program
 * here and opt to view payment terms.
 */
const Home = () => {
  const [terms, setTerms] = useState({});

  useEffect(() => {
    const fetchTerms = async () => {
      const result = await axios('https://api.wetradeup.com/terms');

      setTerms(result.data);
    };

    fetchTerms();
  }, []);

  const programs = Object.keys(terms);

  /* An array of objects where program name is both the key and value.
    Needed to pass to react-select
  */
  const options = programs.map((program) => ({
    value: program,
    label: program,
  }));

  //if data has not yet been fetched, return empty div
  if (terms === null) {
    return <div />;
  }

  return (
    <React.Fragment>
      <div>
        I want to be a
        <Select options={options} />
      </div>
      <Link to="terms">See my terms</Link>
    </React.Fragment>
  );
};

export default Home;
