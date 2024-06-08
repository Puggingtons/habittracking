import Api from "../api/Api";
import { Delete } from "@mui/icons-material";
import DeleteHabitDialog from "./add_new_habit/DeleteHabitDialog";
import { Habit } from "../api/types/Habit";
import { IconButton } from "@mui/material";
import { useState } from "react";

export default function DeleteHabit(props: Readonly<{ habit: Habit }>) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const onClick = () => {
    setOpenDialog(true);
  };

  const onClose = () => {
    setOpenDialog(false);
  };

  const onDelete = () => {
    onClose();

    Api.deleteHabit(props.habit.id);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          onClick();
        }}
      >
        <Delete />
      </IconButton>
      <DeleteHabitDialog
        habit={props.habit}
        open={openDialog}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
}
