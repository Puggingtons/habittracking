import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Api from "../../api/Api";
import { useNavigate } from "react-router";

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

  return (
    <>
      <Button onClick={logout}>Logout</Button>
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
    <Paper elevation={5} sx={{ margin: "1rem" }}>
      <Typography variant="h3">Name: {name}</Typography>
      <Typography variant="h5">Interval: {interval}</Typography>
    </Paper>
  );
}
