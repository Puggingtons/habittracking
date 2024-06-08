import Api from "../api/Api";
import { Edit } from "@mui/icons-material";
import EditHabitModal from "./dialogs/EditHabitDialog";
import { Habit } from "../api/types/Habit";
import { IconButton } from "@mui/material";
import { useState } from "react";

export default function EditHabit(props: Readonly<{ habit: Habit }>) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const onClick = () => {
    setOpenDialog(true);
  };

  const onClose = () => {
    setOpenDialog(false);
  };

  const onSubmit = (habit: Habit) => {
    onClose();

    Api.putHabit(props.habit.id, habit);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          onClick();
        }}
      >
        <Edit />
      </IconButton>
      <EditHabitModal
        habit={props.habit}
        open={openDialog}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
}
