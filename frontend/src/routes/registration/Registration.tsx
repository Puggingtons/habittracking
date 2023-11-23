import { Button, Paper, TextField, createTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ThemeOptions } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";
import "../registration/Registration.css"


  //Theme builder: https://zenoo.github.io/mui-theme-creator/
  export const themeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#ec3b66',
      },
      secondary: {
        main: '#8483f1',
      },
    },
  };

const ColorMode = React.createContext({toggleColorMode: () => {}});

export default function Registration() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const theme = createTheme(themeOptions);
  const colorMode = React.useContext(ColorMode);

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onRegistrationButtonPressed = () => {
    Api.register(username, password).then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log("successfully registered");
        console.log(res.body);
        console.log(await res.json());
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="RegisterWindow">
    <Paper elevation={7} square={false} className="paper">
    <h2 className="header">Habittracking Registration</h2>
      <ColumnFlexBox>
        <TextField style={{margin: "10px"}}
          onChange={onUsernameChange}
          label="Username"
          sx={{color: "white"}}
        ></TextField>
        <TextField style={{margin: "10px"}}
          onChange={onPasswordChange}
          label="Password"
        ></TextField>
        <Button style={{margin: "10px"}}
          variant="contained"
          onClick={onRegistrationButtonPressed}
        >
          Register
        </Button>
        <Button
          style={{margin: "10px"}}
          variant="contained"
          onClick={() => {
            window.location.href = "/login";
          }}>
          Login
          </Button>
      </ColumnFlexBox>
    </Paper>
    </div>
    </ThemeProvider>
  );
}
