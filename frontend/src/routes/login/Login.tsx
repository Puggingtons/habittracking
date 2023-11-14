import { Button, Paper, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

import Api from "../../api/Api";
import { ColumnFlexBox } from "../../components/FlexBox";

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
    <Paper>
      <ColumnFlexBox>
        <TextField
          onChange={onUsernameChange}
          label="Username"
        ></TextField>
        <TextField
          onChange={onPasswordChange}
          label="Password"
        ></TextField>
        <Button
          variant="contained"
          onClick={onLoginButtonPressed}
        >
          Login
        </Button>
      </ColumnFlexBox>
    </Paper>
  );
}
