import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";

import AccessTokenHandler from "../api/AccessTokenHandler";
import App from "../App";
import HabitOverview from "../routes/habitOverview/HabitOverview";
import Login from "../routes/login/Login";
import MainPage from "../routes/mainPage/MainPage";
import Registration from "../routes/registration/Registration";

const checkLogin = async () => {
  // const loggedIn = await AccessTokenHandler.isLoggedIn();
  const loggedIn = true;
  
  if (!loggedIn) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />

      <Route path="login" element={<Login />} />

      <Route path="register" element={<Registration />} />

      <Route element={<MainPage />} loader={checkLogin}>
        <Route path="habits" element={<HabitOverview />} loader={checkLogin} />
      </Route>
    </Route>
  )
);
