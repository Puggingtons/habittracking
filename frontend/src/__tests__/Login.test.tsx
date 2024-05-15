import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../routes/login/Login';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Registration from '../routes/registration/Registration';

test('Renders the site correctly', () => {
     render(<Login />, {wrapper: BrowserRouter})

     expect(screen.getByText(/Habittracking Login/i)).toBeInTheDocument()
     expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
});

test('Navigates to register', async () => {
     render(<Login />, {wrapper: BrowserRouter})

     await userEvent.click(screen.getByText(/Register/i))
     render(<Registration />, {wrapper: BrowserRouter})


     expect(screen.getByText(/Habittracking Registration/i)).toBeInTheDocument()
});