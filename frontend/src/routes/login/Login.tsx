import "../login/Login.css";

import { Button, Paper, TextField, ThemeProvider, createTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { dark } from "../../Theme";

import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const theme = createTheme(dark);

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLoginButtonPressed = () => {
    Api.login(username, password);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="LoginWindow">
      <Paper
        elevation={7}
        square={false}
        className="paper"
      >
        <h2 className="header">Habittracking Login</h2>
        <ColumnFlexBox>
          <TextField
            style={{ margin: "10px" }}
            onChange={onUsernameChange}
            label="Username"
          ></TextField>
          <TextField
            style={{ margin: "10px" }}
            onChange={onPasswordChange}
            label="Password"
          ></TextField>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={onLoginButtonPressed}
          >
            Login
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Register
          </Button>
        </ColumnFlexBox>
      </Paper>
    </div>
    </ThemeProvider>
  );
}
