import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { Habit } from "../../api/types/Habit";

export default function DeleteHabitDialog(
  props: Readonly<{
    habit: Habit;
    open: boolean;
    onClose: Function;
    onDelete: Function;
  }>
) {
  const onClose = () => {
    props.onClose();
  };

  const onDelete = () => {
    props.onDelete();
  };

  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Abort</Button>
        <Button variant={"contained"} color={"error"} onClick={onDelete}>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
