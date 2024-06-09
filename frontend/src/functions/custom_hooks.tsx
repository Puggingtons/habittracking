import { useState } from "react";

//define types for custom hook
export type HabitViewStyleHookProps = {
    habitViewStyleState: string;
    updateHabitViewStyleState: (value: string) => void;
}

//create custom react hook to set overview state
export function HabitViewStyleHook() {
    //define state hook
    const [currentHabitViewStyle, setCurrentHabitViewStyle] = useState<string>('grid');

    //function to update react hook
    function updateCurrentHabitViewStyle(passedViewStyleValue: string){
        setCurrentHabitViewStyle(passedViewStyleValue);
    }

    //return custom hook properties
    return { currentHabitViewStyle, updateCurrentHabitViewStyle }
}