import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { HabitEntry, HabitWithEntries } from "../../api/types/Habit";
import { useEffect, useState } from "react";

import Api from "../../api/Api";
import { useParams } from "react-router";

export default function HabitDetails() {
  const { id } = useParams();

  const [habit, setHabit] = useState<HabitWithEntries | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    Api.getHabit(Number.parseInt(id)).then(async (result) => {
      setHabit(await result.json());
    });
    Api.getDueHabits().then(async (result) => {
      console.log(await result.json());
    });
  }, [id]);

  if (!habit) {
    return <></>;
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5">{habit.name}</Typography>
        <Typography variant="body2">{habit.description}</Typography>
        <Entries entries={habit.entries} />
      </CardContent>
    </Card>
  );
}

function Entries(props: Readonly<{ entries: HabitEntry[] }>) {
  return (
    <List>
      {props.entries.map((entry) => (
        <ListItem key={entry.id}>{displayDate(entry.timestamp)}</ListItem>
      ))}
    </List>
  );
}

const displayDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};
