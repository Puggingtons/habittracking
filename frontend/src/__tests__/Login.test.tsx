import { BrowserRouter } from 'react-router-dom';

import Login from '../routes/login/Login';
import Registration from '../routes/registration/Registration';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

test('Renders the site correctly', () => {
     //Render login page
     render(<Login />, {wrapper: BrowserRouter})

     //Check for the main elements of the login page (title, textfields for username & password)
     expect(screen.getByText(/Habittracking Login/i)).toBeInTheDocument()
     expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
});

test('Navigates to register', async () => {
     //Render login page first
     render(<Login />, {wrapper: BrowserRouter})

     //Call UserEvent: Click on button labeled "Register"
     await userEvent.click(screen.getByText(/Register/i))
     //Render the register page
     render(<Registration />, {wrapper: BrowserRouter})

     //Check if page has correct title
     expect(screen.getByText(/Habittracking Registration/i)).toBeInTheDocument()
});