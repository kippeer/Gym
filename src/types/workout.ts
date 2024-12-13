export type MuscleGroup = keyof typeof exercisesByMuscleGroup;

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
}

export interface WorkoutDay {
  name: string;
  exercises: Exercise[];
}

export type WorkoutSplit = 'ABC' | 'ABCD';

export interface WorkoutPlan {
  type: WorkoutSplit;
  days: WorkoutDay[];
}