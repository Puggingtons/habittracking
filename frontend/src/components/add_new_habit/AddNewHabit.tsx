//import style properties for modal
import "./modal_style.css";

import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import Api from "../../api/Api";
import CloseIcon from "@mui/icons-material/Close";
import FlexBox from "../FlexBox";

//interface for new habit modal props
interface NewHabitModalProps {
  setHabitModalVisibilty: (value: boolean) => void;
}

//export default add new habit modal component
const NewHabitModal: React.FC<NewHabitModalProps> = (
  props: NewHabitModalProps
) => {
  //define state hooks for new habit input
  const [newHabitName, setNewHabitName] = useState<string>("");
  const [newHabitDescription, setNewHabitDescription] = useState<string>("");
  const [newHabitInterval, setNewHabitInterval] = useState<string>("1");
  //Define state hook for fill fields state
  const [fillFieldsState, setFillFieldsState] = useState<boolean>(false);

  const onNewHabitNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewHabitName(event.target.value);
  };
  const onNewHabitDescriptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewHabitDescription(event.target.value);
  };
  const onNewHabitIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewHabitInterval(event.target.value);
  };

  //function for create new habit action
  function createNewHabit() {
    //check if fields are filled
    if (verifyInput()) {
      //code to create new habit

      Api.postHabit({
        name: newHabitName,
        interval: Number.parseInt(newHabitInterval),
        description: newHabitDescription,
      }).then(() => {
        //close new habit modal
        props.setHabitModalVisibilty(false);
      });
    } else {
      //set state to fill fields true
      setFillFieldsState(true);
    }
  }

  const verifyInput = () => {
    return (
      newHabitName !== "" &&
      newHabitInterval !== "" &&
      !isNaN(Number.parseInt(newHabitInterval))
    );
  };

  //return created component
  return (
    <dialog open={true}>
      <FlexBox style={{ justifyContent: "space-between" }}>
        <h2>Add new Habit</h2>
        <IconButton onClick={() => props.setHabitModalVisibilty(false)}>
          <CloseIcon />
        </IconButton>
      </FlexBox>
      <div>
        <span style={{ color: "gray", fontSize: "18px" }}>
          Set your{" "}
          <span style={{ color: "#509CF5", fontWeight: "bold" }}>Habit</span>{" "}
          information and create a new Habit.
        </span>
        <p>
          <TextField
            variant="outlined"
            label="Habit Name"
            className="text-input-fields-style-properties"
            onChange={onNewHabitNameChange}
            error={fillFieldsState}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Habit Description"
            className="text-input-fields-style-properties"
            style={{ width: "95%" }}
            onChange={onNewHabitDescriptionChange}
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Habit Intervall"
            className="text-input-fields-style-properties"
            style={{ width: "95%" }}
            onChange={onNewHabitIntervalChange}
            error={fillFieldsState}
          />
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: "2%" }}>
        <Button
          variant="contained"
          style={{ width: "95%" }}
          onClick={createNewHabit}
        >
          Create new Habit
        </Button>
      </div>
    </dialog>
  );
};
export default NewHabitModal;
