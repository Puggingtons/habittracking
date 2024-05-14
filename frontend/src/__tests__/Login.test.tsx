import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../routes/login/Login';

test('renders text fields correctly', () => {
     render(<Login />);
     const usernameTextField = screen.getByLabelText(/Username/i);
     const passwordTextField = screen.getByLabelText(/Password/i);
     expect(usernameTextField).toBeInstanceOf(HTMLInputElement);
     expect(passwordTextField).toBeInstanceOf(HTMLInputElement);
    });