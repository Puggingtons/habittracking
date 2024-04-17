//add css file
import "./MainPage.css";

//import main page components
import {
  CurrentHabitInformationBar,
  HabitDataNavigationBarContainer,
  NextHabitsContainer,
} from "../../components/main_page/MainPageComponents";

//import created components
import FlexBox from "../../components/FlexBox";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

  return (
    <div className="mainPageContainer">
      <FlexBox>
        <div id="leftSideMainContainer" className="leftSideContainer ">
          <h1 id="welcomeBackHeader" className="">
            Willkommen zurück, Jonas
          </h1>
          <HabitDataNavigationBarContainer />
          <hr id="dividerLine" />
          <CurrentHabitInformationBar />
          <Outlet />
        </div>
        <div id="rightSideContainer" className="rightSideContainer">
          <FlexBox style={{ justifyContent: "space-between" }}>
            <h3>{formattedDate}</h3>
            <IconButton>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          </FlexBox>
          <NextHabitsContainer />
        </div>
      </FlexBox>
    </div>
  );
}
