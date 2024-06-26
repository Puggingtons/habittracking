import { IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddHabitEntryButton from "../../components/AddHabitEntryButton";
import Api from "../../api/Api";
import DeleteHabit from "../../components/DeleteHabit";
import EditHabit from "../../components/EditHabit";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import FlexBox from "../../components/FlexBox";
import GridView from "../../components/grid_view/GridView";
import { Habit } from "../../api/types/Habit";
import OpenHabitDetailsButton from "../../components/OpenHabitDetailsButton";

export default function HabitOverview() {
  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    Api.getHabits().then(async (res) => {
      setHabits(await res.json());
    });
  }, []);

  useEffect(() => {
    if (habits) {
      habits.forEach((habit) => {
        console.log(habit);
      });
    }
  }, [habits]);

  //define state gook to set view
  const [habitViewStyle, setHabitViewStyle] = useState<string>("grid");
  //map for habit views
  const habitViewStyleContainerOptions = new Map([
    ["grid", <GridViewHabitOverview passedHabitObjects={habits} />],
    ["list", <ListHabitOverview passedHabitObjects={habits} />],
  ]);

  return (
    <>
      {
        //set matching grid view style
        habitViewStyleContainerOptions.get(habitViewStyle)
      }
    </>
  );
}

//interface for view component props
interface ViewComponentProps {
  passedHabitObjects?: Habit[];
}

export const GridViewHabitOverview: React.FC<ViewComponentProps> = (
  props: ViewComponentProps
) => {
  return (
    <GridView>
      {props.passedHabitObjects ? (
        props.passedHabitObjects.map((currentHabit) => {
          return <SingleHabit key={currentHabit.id} habit={currentHabit} />;
        })
      ) : (
        <>nope</>
      )}
    </GridView>
  );
};

//interface for habit component props
interface HabitComponentProps {
  habit: Habit;
}

export const SingleHabit: React.FC<HabitComponentProps> = (
  props: HabitComponentProps
) => {
  return (
    <Paper elevation={5} sx={{ margin: ".5rem", padding: "4%", width: "95%" }}>
      <FlexBox style={{ userSelect: "none", justifyContent: "space-between" }}>
        <IconButton disableFocusRipple disableRipple disableTouchRipple>
          <FeaturedPlayListIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            style={{ marginTop: "0%", marginLeft: "4%" }}
          >
            {props.habit.name}
          </Typography>
        </div>
        <div>
          <DeleteHabit habit={props.habit} />
          <EditHabit habit={props.habit} />
          <OpenHabitDetailsButton habit={props.habit} />
          <AddHabitEntryButton habit={props.habit} />
        </div>
      </FlexBox>
      <span style={{ color: "gray" }}>{props.habit.description}</span>
      <br />
      <br />
      <span style={{ fontSize: "18px" }}>
        Habit Interval:{" "}
        <span style={{ color: "#509CF5", fontWeight: "bold" }}>
          {props.habit.interval}
        </span>{" "}
        Tag{props.habit.interval !== 1 ? "e" : ""}
      </span>
    </Paper>
  );
};

//create and export list habit overview
export const ListHabitOverview: React.FC<ViewComponentProps> = (
  props: ViewComponentProps
) => {
  return (
    <table>
      <th>
        <tr></tr>
        <tr>Habit Name</tr>
        <tr>Habit Description</tr>
        <tr>Habit Interval</tr>
      </th>
      {props.passedHabitObjects ? (
        props.passedHabitObjects.map((currentHabitItem) => (
          <ListHabitComponent
            key={currentHabitItem.id}
            habit={currentHabitItem}
          />
        ))
      ) : (
        <>No Data found</>
      )}
    </table>
  );
};

//create and define list habit component
export const ListHabitComponent: React.FC<HabitComponentProps> = (
  props: HabitComponentProps
) => {
  return (
    <td>
      <tr>
        <FeaturedPlayListIcon />
      </tr>
      <tr>{props.habit.name}</tr>
      <tr>{props.habit.description}</tr>
      <tr>{props.habit.interval}</tr>
    </td>
  );
};
