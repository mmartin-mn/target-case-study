import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('./by-route/ByRoute', () => ({
  ByRoute: () => <div>ByRoute</div>
}));

describe('App', () => {
  it('should render the component', () => {
    const { getByText } = render(<App />, { wrapper: BrowserRouter });

    expect(getByText('Real Time Departures')).toBeInTheDocument();
  });
})


