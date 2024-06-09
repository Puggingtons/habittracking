import { IconButton, IconButtonProps } from "@mui/material";

import { Habit } from "../api/types/Habit";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function OpenHabitDetailsButton(
  props: IconButtonProps & { habit: Habit }
) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/habit/${props.habit.id}`);
  };

  return (
    <IconButton onClick={onClick}>
      <Search />
    </IconButton>
  );
}
