import "./MainPageComponents.css";

//import css rules
import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import AddHabitEntryButton from "../AddHabitEntryButton";
import AddIcon from "@mui/icons-material/Add";
import Api from "../../api/Api";
//import created components
import FlexBox from "../FlexBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
//import images
import GridViewIcon from "@mui/icons-material/GridView";
import { Habit } from "../../api/types/Habit";
import NewHabitModal from "../add_new_habit/AddNewHabit";

//define habits navigation bar container
export function HabitDataNavigationBarContainer() {
  //define state hook to open add new habit modal
  const [addNewHabitModal, setAddNewHabitModal] = useState<boolean>(false);
  //define state hook
  const [currentHabitOverviewRange, setCurrentHabitOverviewRange] =
    useState<string>("all");

  //return created component
  return (
    <FlexBox
      style={{
        justifyContent: "space-between",
      }}
    >
      {/* disable habit ranges for now */}
      {false && (
        <HabitRanges
          range={currentHabitOverviewRange}
          setRange={(s: string) => setCurrentHabitOverviewRange(s)}
        />
      )}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: "60px",
          backgroundColor: "#509CF5",
        }}
        onClick={() => setAddNewHabitModal(true)}
      >
        Neues Hinzu.
      </Button>
      {
        //check if to open add new habit modal
        addNewHabitModal && (
          <NewHabitModal setHabitModalVisibilty={setAddNewHabitModal} />
        )
      }
    </FlexBox>
  );
}

function HabitRanges(
  props: Readonly<{ range: string; setRange: (s: string) => void }>
) {
  const { range, setRange } = props;
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: "75%",
        backgroundColor: "#181818",
        borderRadius: "25px",
        marginLeft: "2%",
        marginRight: "2%",
        paddingLeft: "2%",
        paddingRight: "1%",
        fontWeight: "bold",
      }}
    >
      <ListItem
        className={`navigation-bar-button-style-properties ${
          range === "all" ? "navigation-bar-button-focus-style" : null
        }`}
        onClick={() => setRange("all")}
      >
        Alle
      </ListItem>
      <ListItem
        className={`navigation-bar-button-style-properties ${
          range === "year" ? "navigation-bar-button-focus-style" : null
        }`}
        onClick={() => setRange("year")}
      >
        Jahr
      </ListItem>
      <ListItem
        className={`navigation-bar-button-style-properties ${
          range === "month" ? "navigation-bar-button-focus-style" : null
        }`}
        onClick={() => setRange("month")}
      >
        Monat
      </ListItem>
      <ListItem
        className={`navigation-bar-button-style-properties ${
          range === "week" ? "navigation-bar-button-focus-style" : null
        }`}
        onClick={() => setRange("week")}
      >
        Woche
      </ListItem>
    </Stack>
  );
}

//define current habit state information bar
export function CurrentHabitInformationBar() {
  const [currentHabitViewStyle, setCurrentHabitViewType] =
    useState<string>("grid");

  return (
    <FlexBox
      style={{
        justifyContent: "space-between",
      }}
    >
      <h2 id="currentDisplayHabitsInformation">Alle Habits</h2>
      <FlexBoxButtonComponent />
    </FlexBox>
  );

  //define flex box button component
  function FlexBoxButtonComponent() {
    return (
      <FlexBox>
        <IconButton onClick={() => setCurrentHabitViewType("grid")}>
          <GridViewIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => setCurrentHabitViewType("list")}>
          <FormatListBulletedIcon style={{ color: "white" }} />
        </IconButton>
      </FlexBox>
    );
  }
}

//define next habits container
export function NextHabitsContainer() {
  const [dueHabits, setDueHabits] = useState<Habit[]>([]);

  useEffect(() => {
    Api.getDueHabits().then(async (res) => {
      setDueHabits(await res.json());
    });
  });
  return (
    <div id="nextHabitsContainer" className="nextHabitsContainerStyle">
      <h3>Anstehende Habits:</h3>
      <Stack spacing={2}>
        {dueHabits.map((habit) => (
          <ListItem key={habit.id}>
            <FlexBox style={{ alignContent: "space-between", width: "100%" }}>
              <ListItemText>{habit.name}</ListItemText>
              <AddHabitEntryButton habit={habit} />
            </FlexBox>
          </ListItem>
        ))}
        {dueHabits.length === 0 && (
          <ListItem>keine anstehenden Habits :)</ListItem>
        )}
      </Stack>
    </div>
  );
}
