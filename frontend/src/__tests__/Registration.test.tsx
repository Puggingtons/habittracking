import { render, screen } from "@testing-library/react"
import Registration from "../routes/registration/Registration"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event";
import Login from "../routes/login/Login";

test('Renders the site correctly', () => {
    //Render register page
    render(<Registration />, {wrapper: BrowserRouter})

    //Check for main elements of the register page (title, textfields for username & password)
    expect(screen.getByText(/Habittracking Registration/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
});

test('Navigates to login', async () => {
    //Render register page first
    render(<Registration />, {wrapper: BrowserRouter})

    //Call UserEvent: Click on button labeled "Login"
    await userEvent.click(screen.getByText(/Login/i))
    //Render the login page
    render(<Login />, {wrapper: BrowserRouter})

    //Check if page has correct title
    expect(screen.getByText(/Habittracking Login/i)).toBeInTheDocument()
})