import { Route, Routes } from "react-router-dom";

import App from "../App";
import HabitOverview from "../routes/habitOverview/HabitOverview";
import Login from "../routes/login/Login";
import MainPage from "../routes/mainPage/MainPage";
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
        path="/"
        element={<MainPage />}
      >
        <Route
          path="habits"
          element={<HabitOverview />}
        />
      </Route>
    </Routes>
  );
}
