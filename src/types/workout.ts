export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface MuscleGroup {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  muscleGroups: string[];
}

export interface WorkoutSplit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  days: WorkoutDay[];
}

export interface SavedWorkout {
  id: string;
  name: string;
  date: string;
  split: WorkoutSplit;
  day: WorkoutDay;
  muscleGroups: MuscleGroup[];
}

export interface Workout {
  id: string;
  name: string;
  muscleGroups: MuscleGroup[];
  selectedSplit?: WorkoutSplit;
  selectedDay?: WorkoutDay;
  savedWorkouts: SavedWorkout[];
}