import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/layout/Footer';

describe('Footer component', () => {
    test('renders app component', async () => {
      render(<Footer />);
      
      //const pElement = await screen.find('developed by jcuencas');
      const pElement = screen.getAllByText(/developed by jcuencas/i)[0];
      expect(pElement).toBeInTheDocument();
      //expect(screen.getByText("developed by jcuencas")).toBeInTheDocument();
    });
});
