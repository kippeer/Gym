import React, { useState } from 'react';
import { Dumbbell, Save } from 'lucide-react';
import ExerciseForm from './components/ExerciseForm';
import WorkoutPDF from './components/WorkoutPDF';
import MuscleGroupTabs from './components/MuscleGroupTabs';
import ExerciseList from './components/ExerciseList';
import WorkoutSplitSelector from './components/WorkoutSplitSelector';
import SavedWorkoutsList from './components/SavedWorkoutsList';
import { useWorkoutStorage } from './hooks/useWorkoutStorage';
import type { Exercise, SavedWorkout, WorkoutSplit, WorkoutDay } from './types/workout';

const initialMuscleGroups = [
  { id: '1', name: 'Peito', exercises: [] },
  { id: '2', name: 'Costas', exercises: [] },
  { id: '3', name: 'Pernas', exercises: [] },
  { id: '4', name: 'Ombros', exercises: [] },
  { id: '5', name: 'Bíceps', exercises: [] },
  { id: '6', name: 'Tríceps', exercises: [] },
  { id: '7', name: 'Abdômen', exercises: [] },
];

function App() {
  const { workout, setWorkout, saveCurrentWorkout } = useWorkoutStorage({
    id: '1',
    name: 'Meu Treino',
    muscleGroups: initialMuscleGroups,
    savedWorkouts: [],
  });
  
  const [selectedGroup, setSelectedGroup] = useState<string>(initialMuscleGroups[0].id);
  const [selectedSavedWorkout, setSelectedSavedWorkout] = useState<SavedWorkout | null>(null);

  const handleSelectSplit = (split: WorkoutSplit) => {
    setWorkout((prev) => ({
      ...prev,
      selectedSplit: split,
      selectedDay: undefined,
    }));
  };

  const handleSelectDay = (day: WorkoutDay) => {
    setWorkout((prev) => ({
      ...prev,
      selectedDay: day,
    }));
    if (day.muscleGroups.length > 0) {
      setSelectedGroup(day.muscleGroups[0]);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    setWorkout((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.map((group) =>
        group.id === selectedGroup
          ? { ...group, exercises: [...group.exercises, exercise] }
          : group
      ),
    }));
  };

  const handleRemoveExercise = (groupId: string, exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.map((group) =>
        group.id === groupId
          ? { ...group, exercises: group.exercises.filter((ex) => ex.id !== exerciseId) }
          : group
      ),
    }));
  };

  const handleSaveWorkout = () => {
    try {
      saveCurrentWorkout();
      alert('Treino salvo com sucesso!');
    } catch (error) {
      alert('Selecione um treino e um dia antes de salvar.');
    }
  };

  if (selectedSavedWorkout) {
    return (
      <div className="h-screen">
        <button
          onClick={() => setSelectedSavedWorkout(null)}
          className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Voltar
        </button>
        <WorkoutPDF workout={selectedSavedWorkout} />
      </div>
    );
  }

  const visibleMuscleGroups = workout.selectedDay
    ? workout.muscleGroups.filter((group) => workout.selectedDay!.muscleGroups.includes(group.id))
    : workout.muscleGroups;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Planejador de Treino</h1>
          </div>
          {workout.selectedDay && (
            <button
              onClick={handleSaveWorkout}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            >
              <Save size={20} />
              Salvar Treino
            </button>
          )}
        </div>

        <SavedWorkoutsList
          savedWorkouts={workout.savedWorkouts}
          onViewPDF={setSelectedSavedWorkout}
        />

        <WorkoutSplitSelector
          onSelectSplit={handleSelectSplit}
          onSelectDay={handleSelectDay}
          selectedSplit={workout.selectedSplit}
          selectedDay={workout.selectedDay}
        />

        {workout.selectedDay && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <MuscleGroupTabs
                muscleGroups={visibleMuscleGroups}
                selectedGroup={selectedGroup}
                onSelectGroup={setSelectedGroup}
              />
              <ExerciseForm onAdd={handleAddExercise} selectedGroupId={selectedGroup} />
            </div>

            <ExerciseList
              muscleGroups={visibleMuscleGroups}
              onRemoveExercise={handleRemoveExercise}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;