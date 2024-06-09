export type Habit = {
  id: number;
  name: string;
  description: string;
  interval: number;
};

export type HabitWithEntries = Habit & {
  entries: HabitEntry[];
};

export type HabitEntry = {
  id: number;
  timestamp: string;
  habitId: number;
};
