import { Button, Paper, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";
import "../login/Login.css"

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLoginButtonPressed = () => {
    Api.login(username, password).then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log("successfully logged in");
        console.log(res.body);
        console.log(await res.json());
      }
    });
  };

  return (
    <div className="LoginWindow">
    <Paper elevation={7} square={false} className="paper">
      <h2 className="header">Habittracking Login</h2>
      <ColumnFlexBox>
        <TextField style={{margin: "10px"}}
          onChange={onUsernameChange}
          label="Username"
        ></TextField>
        <TextField style={{margin: "10px"}}
          onChange={onPasswordChange}
          label="Password"
        ></TextField>
        <Button 
          style={{margin: "10px"}}
          variant="contained"
          onClick={onLoginButtonPressed}
        >
          Login
        </Button>
        <Button
          style={{margin: "10px"}}
          variant="contained"
          onClick={() => {
            window.location.href = "/register";
          }}>
          Register
          </Button>
      </ColumnFlexBox>
    </Paper>
    </div>
  );
}
