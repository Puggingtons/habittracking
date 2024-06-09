import { ButtonProps, IconButton } from "@mui/material";

import { Add } from "@mui/icons-material";
import Api from "../api/Api";
import { Habit } from "../api/types/Habit";

export default function AddHabitEntryButton(
  props: ButtonProps & { habit: Habit }
) {
  const onClick = () => {
    Api.postHabitEntry(props.habit.id);
  };

  return (
    <IconButton color="success" onClick={onClick}>
      <Add />
    </IconButton>
  );
}
