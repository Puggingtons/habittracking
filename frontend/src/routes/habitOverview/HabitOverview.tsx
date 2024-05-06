import { Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

import Api from "../../api/Api";
import { useNavigate } from "react-router";
import GridView from "../../components/grid_view/GridView";
import FlexBox from "../../components/FlexBox";

type Habit = {
  id: number;
  name: string;
  interval: number;
  userId: number;
};

export default function HabitOverview() {
  const [habits, setHabits] = useState<Habit[]>();

  const navigate = useNavigate();

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

  const logout = () => {
    Api.logout();
    navigate("/login");
  };

  //define state gook to set view
  const [habitViewStyle, setHabitViewStyle] = useState<string>('grid');
  //map for habit views
  const habitViewStyleContainerOptions = new Map([
    ["grid", <GridViewHabitOverview passedHabitObjects={habits}/>],
    ["list", <ListHabitOverview passedHabitObjects={habits}/>]
  ]);

  return (
    <>
      <Button onClick={logout}>Logout</Button>
      {
        //set matching grid view style
        habitViewStyleContainerOptions.get(habitViewStyle)
      }
    </>
  );
}

//interface for view component props
interface ViewComponentProps {
  passedHabitObjects?: Habit[]
}

export const GridViewHabitOverview: React.FC<ViewComponentProps> = (props: ViewComponentProps) => {
  return (
    <GridView>
        {props.passedHabitObjects ? (
          props.passedHabitObjects.map((currentHabit) => {
            return (
              <SingleHabit
                key={currentHabit.id}
                name={currentHabit.name}
                description="default_habit_description_text"
                interval={currentHabit.interval}
              />
            );
          })
        ) : (
          <>nope</>
        )}
    </GridView>
  )
}

//interface for habit component props
interface HabitComponentProps {
  name: string,
  description?: string,
  interval: number
}

export const SingleHabit: React.FC<HabitComponentProps> = (props: HabitComponentProps) => {
  return (
    <Paper elevation={5} sx={{ margin: ".5rem", padding: '4%', width: '95%' }}>
      <FlexBox style={{userSelect: 'none'}}>
        <FeaturedPlayListIcon/>
        <h2 style={{marginTop: '0%', marginLeft: '4%'}}>{props.name}</h2>
      </FlexBox>
      <span style={{color: 'gray'}}>{props.description}</span><br/><br/>
      <span style={{fontSize: '18px'}}>Habit Interval: <span style={{color: '#509CF5', fontWeight: 'bold'}}>{props.interval}</span></span>
    </Paper>
  );
}

//create and export list habit overview
export const ListHabitOverview : React.FC<ViewComponentProps> = (props: ViewComponentProps) => {
  return (
    <table>
      <th>
        <tr></tr>
        <tr>Habit Name</tr>
        <tr>Habit Description</tr>
        <tr>Habit Interval</tr>
      </th>
      {
        props.passedHabitObjects ? (
          props.passedHabitObjects.map((currentHabitItem) => (
            <ListHabitComponent key={currentHabitItem.id} 
              name={currentHabitItem.name} 
              description="default_habit_description_text"
              interval={currentHabitItem.interval}/>
          ))
        ) : (
          <>No Data found</>
        )
      }
    </table>
  );
}

//create and define list habit component 
export const ListHabitComponent: React.FC<HabitComponentProps> = (props: HabitComponentProps) => {
  return (
    <td>
      <tr>
        <FeaturedPlayListIcon/>
      </tr>
      <tr>{props.name}</tr>
      <tr>{props.description}</tr>
      <tr>{props.interval}</tr>
    </td>
  )
}