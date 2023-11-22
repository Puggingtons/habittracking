import { Route, Routes } from "react-router-dom";

import App from "../App";
import HabitOverview from "../routes/habitOverview/HabitOverview";
import Login from "../routes/login/Login";
import Registration from "../routes/registration/Registration";

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
      <Route
        path="register"
        element={<Registration />}
      />
      <Route
        path="habits"
        element={<HabitOverview />}
      />
    </Routes>
  );
}
