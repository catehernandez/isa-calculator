import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ISACalculator from './ISACalculator';
let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('sets monthly payments correctly', () => {
  act(() => {
    render(
      <ISACalculator
        borrowed={6000}
        cap={1.5}
        length={24}
        take={0.091}
        threshold={2500}
        avgAnnualSalary={37500}
      />,
      container
    );
  });

  expect(container.querySelector('.monthly-payment').textContent).toBe(
    '$284.38'
  );
});
