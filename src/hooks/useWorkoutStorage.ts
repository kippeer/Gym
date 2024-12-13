import { useState, useEffect } from 'react';
import type { Workout, SavedWorkout } from '../types/workout';

const STORAGE_KEY = 'workout_app_data';

export function useWorkoutStorage(initialWorkout: Workout) {
  const [workout, setWorkout] = useState<Workout>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return initialWorkout;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workout));
  }, [workout]);

  const saveCurrentWorkout = () => {
    if (!workout.selectedSplit || !workout.selectedDay) {
      throw new Error('No workout selected');
    }

    const savedWorkout: SavedWorkout = {
      id: crypto.randomUUID(),
      name: workout.name,
      date: new Date().toISOString(),
      split: workout.selectedSplit,
      day: workout.selectedDay,
      muscleGroups: workout.muscleGroups.filter(group => 
        workout.selectedDay!.muscleGroups.includes(group.id)
      ),
    };

    setWorkout(prev => ({
      ...prev,
      savedWorkouts: [...prev.savedWorkouts, savedWorkout],
    }));

    return savedWorkout;
  };

  return { workout, setWorkout, saveCurrentWorkout };
}