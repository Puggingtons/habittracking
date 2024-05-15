import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../routes/login/Login';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('renders the site correctly', () => {
     render(<Login />, {wrapper: BrowserRouter})

     expect(screen.getByText(/Habittracking Login/i)).toBeInTheDocument()
    });