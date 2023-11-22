import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Api from "../../api/Api";

type Habit = {
  id: number;
  name: string;
  interval: number;
  userId: number;
};

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

  return (
    <>
      {habits ? (
        habits.map((habit) => {
          return (
            <SingleHabit
              key={habit.id}
              name={habit.name}
              interval={habit.interval}
            />
          );
        })
      ) : (
        <>nope</>
      )}
    </>
  );
}

export function SingleHabit(props: { name: string; interval: number }) {
  const { name, interval } = props;

  return (
    <Paper elevation={5} sx={{margin: "1rem"}}>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h5">Interval: {interval}</Typography>
    </Paper>
  );
}
