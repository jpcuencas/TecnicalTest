import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/App';
describe('App component', () => {

    it('renders app component', () => {
      render(<App />);
      //const linkElement = screen.getAllByText(/learn react/i);
      //expect(linkElement).toBeInTheDocument();
    });
});
