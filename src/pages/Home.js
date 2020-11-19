import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  console.log(terms);

  const programs = Object.keys(terms);

  console.log(programs);

  //e.g. if data has not yet been fetched
  if (terms === null) {
    return <div />;
  }

  return (
    <React.Fragment>
      <div>Home page</div>
      <Link to="terms">See my terms</Link>
    </React.Fragment>
  );
};

export default Home;
