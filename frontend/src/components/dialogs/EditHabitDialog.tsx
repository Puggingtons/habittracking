import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { Habit } from "../../api/types/Habit";
import { useState } from "react";

export default function EditHabitDialog(
  props: Readonly<{
    habit: Habit;
    open: boolean;
    onClose: Function;
    onSubmit: (habit: Habit) => void;
  }>
) {
  const [habitData, setHabitData] = useState<Habit>(props.habit);

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
    >
      <DialogTitle>Edit Habit</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <DialogTextField
          label="Name"
          defaultValue={props.habit.name}
          onChange={(event) =>
            setHabitData((h) => ({ ...h, name: event.target.value }))
          }
        ></DialogTextField>
        <DialogTextField
          label="Description"
          defaultValue={props.habit.description}
          onChange={(event) =>
            setHabitData((h) => ({ ...h, description: event.target.value }))
          }
        ></DialogTextField>
        <DialogTextField
          label="Interval"
          defaultValue={props.habit.interval}
          onChange={(event) =>
            setHabitData((h) => ({
              ...h,
              interval: Number.parseFloat(event.target.value),
            }))
          }
        ></DialogTextField>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between ",
          width: "100%",
        }}
      >
        <Button onClick={() => props.onClose()}>
          close
        </Button>
        <Button
          variant={"contained"}
          color={"success"}
          onClick={() => props.onSubmit(habitData)}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const DialogTextField = (props: TextFieldProps) => {
  return <TextField {...props} sx={{ margin: "0.5rem" }} />;
};
