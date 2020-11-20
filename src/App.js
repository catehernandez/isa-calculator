import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SelectProgram from './pages/SelectProgram';
import Terms from './pages/Terms';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <SelectProgram />
      </Route>
      <Route exact path="/terms">
        <Terms />
      </Route>
    </BrowserRouter>
  );
};

export default App;
