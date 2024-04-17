import "../registration/Registration.css";

import { Button, Paper, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";
import { useNavigate } from "react-router";

export default function Registration() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onRegistrationButtonPressed = () => {
    Api.register(username, password)
      .then((res) => {
        navigate("/habits");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="RegisterWindow">
      <Paper
        elevation={7}
        square={false}
        className="paper"
      >
        <h2 className="header">Habittracking Registration</h2>
        <ColumnFlexBox>
          <TextField
            style={{ margin: "10px" }}
            onChange={onUsernameChange}
            label="Username"
            sx={{ color: "white" }}
          ></TextField>
          <TextField
            style={{ margin: "10px" }}
            onChange={onPasswordChange}
            label="Password"
            type="password"
          ></TextField>
          <Button
            variant="contained"
            onClick={onRegistrationButtonPressed}
          >
            Register
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </ColumnFlexBox>
      </Paper>
    </div>
  );
}
