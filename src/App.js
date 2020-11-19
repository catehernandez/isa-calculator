import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Terms from './pages/Terms';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/terms">
        <Terms />
      </Route>
    </BrowserRouter>
  );
};

export default App;
