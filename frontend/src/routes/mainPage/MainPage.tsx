//add css file
import "./MainPage.css";

//import main page components
import {
  CurrentHabitInformationBar,
  HabitDataNavigationBarContainer,
  NextHabitsContainer,
} from "../../components/main_page/MainPageComponents";
import { useEffect, useState } from "react";

import Api from "../../api/Api";
//import created components
import FlexBox from "../../components/FlexBox";
import MenuButton from "../../components/MenuButton";
import { Outlet } from "react-router";

export default function MainPage() {
  //set date time format options
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    Api.getUser().then(async (res) => {
      setUsername((await res.json()).username);
    });
  }, []);

  return (
    <div className="mainPageContainer">
      <FlexBox>
        <div id="leftSideMainContainer" className="leftSideContainer ">
          <h1 id="welcomeBackHeader" className="">
            Willkommen zurück, {username}
          </h1>
          <HabitDataNavigationBarContainer />
          <hr id="dividerLine" />
          <CurrentHabitInformationBar />
          <Outlet />
        </div>
        <div id="rightSideContainer" className="rightSideContainer">
          <FlexBox style={{ justifyContent: "space-between" }}>
            <h3>{formattedDate}</h3>
            <MenuButton />
          </FlexBox>
          <NextHabitsContainer />
        </div>
      </FlexBox>
    </div>
  );
}
