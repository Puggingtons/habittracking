import { Route, Routes } from "react-router-dom";

import App from "../App";
import Login from "../routes/login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        index
        element={<App />}
      />
      <Route
        path="login"
        element={<Login />}
      />
    </Routes>
  );
}
