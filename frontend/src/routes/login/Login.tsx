import "../login/Login.css";

import { Button, Paper, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import AccessTokenHandler from "../../api/AccessTokenHandler";
import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLoginButtonPressed = () => {
    Api.login(username, password)
      .then((res) => {
        navigate("/habits");
      })
      .catch((res) => {
        // TODO show error in frontend
        console.log("dings fehler und so dies das.");
      });
  };

  useEffect(() => {
    // when user is logged in, directly redirect to homepage
    if (AccessTokenHandler.isLoggedIn()) {
      navigate("/habits");
    }
  }, [navigate]);

  return (
    <div className="LoginWindow">
      <Paper
        elevation={20}
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
            type="password"
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
              navigate("/register");
            }}
          >
            Register
          </Button>
        </ColumnFlexBox>
      </Paper>
    </div>
  );
}
