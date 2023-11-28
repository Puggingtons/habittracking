import { Outlet } from "react-router";
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import created components
import FlexBox  from '../../components/FlexBox';

//import main page components
import { HabitDataNavigationBarContainer, CurrentHabitInformationBar, NextHabitsContainer } from '../../components/main_page/MainPageComponents';

//add css file
import './MainPage.css';
import { IconButton } from "@mui/material";

export default function MainPage() {
  //get current date and set to textspace
  const currentDateInformationText = document.getElementById("currentDateInformation");

  //set date time format options
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',   
    month: 'long',     
    day: 'numeric',    
  };
  const currentDate = new Date(),
    formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  //currentDateInformationText.textContent = formattedDate.toString();

  return (
    <div className="mainPageContainer">
        <FlexBox>
          <div id="leftSideMainContainer" className="leftSideContainer ">
            <h1 id="welcomeBackHeader" className="">Willkommen zurück, Jonas</h1>
            <HabitDataNavigationBarContainer/>
            <hr id="dividerLine"/>
            <CurrentHabitInformationBar/>


          </div>
          <div id="rightSideContainer" className='rightSideContainer'>
            <FlexBox style={{justifyContent: 'space-between'}}>
              <h3 id="currentDateInformation">day_name, month day_date</h3>
              <IconButton>
                <MoreVertIcon style={{color: 'white'}}/>
              </IconButton>
            </FlexBox>
            <NextHabitsContainer/>
          </div>
        </FlexBox>
      <Outlet />
    </div>
  );
}
