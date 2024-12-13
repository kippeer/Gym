import React from 'react';
import { ExerciseForm } from './components/ExerciseForm';
import { WorkoutDay } from './components/WorkoutDay';
import { SaveButton } from './components/SaveButton';
import { Exercise, WorkoutPlan, WorkoutSplit } from './types/workout';
import { Dumbbell } from 'lucide-react';

function App() {
  const [workoutType, setWorkoutType] = React.useState<WorkoutSplit>('ABC');
  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan>({
    type: 'ABC',
    days: [
      { name: 'A', exercises: [] },
      { name: 'B', exercises: [] },
      { name: 'C', exercises: [] },
    ],
  });
  const [selectedDay, setSelectedDay] = React.useState(0);

  const handleWorkoutTypeChange = (type: WorkoutSplit) => {
    setWorkoutType(type);
    setSelectedDay(0);
    setWorkoutPlan({
      type,
      days: type === 'ABC'
        ? [
            { name: 'A', exercises: [] },
            { name: 'B', exercises: [] },
            { name: 'C', exercises: [] },
          ]
        : [
            { name: 'A', exercises: [] },
            { name: 'B', exercises: [] },
            { name: 'C', exercises: [] },
            { name: 'D', exercises: [] },
          ],
    });
  };

  const handleAddExercise = (exercise: Exercise) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === selectedDay
          ? { ...day, exercises: [...day.exercises, exercise] }
          : day
      ),
    }));
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              exercises: day.exercises.filter((_, i) => i !== exerciseIndex),
            }
          : day
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <Dumbbell size={32} />
            <h1 className="text-3xl font-bold">Planejador de Treino</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-md ${
                workoutType === 'ABC'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleWorkoutTypeChange('ABC')}
            >
              Treino ABC
            </button>
            <button
              className={`px-6 py-2 rounded-md ${
                workoutType === 'ABCD'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleWorkoutTypeChange('ABCD')}
            >
              Treino ABCD
            </button>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex gap-2">
              {workoutPlan.days.map((day, index) => (
                <button
                  key={day.name}
                  className={`px-4 py-2 rounded-md ${
                    selectedDay === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDay(index)}
                >
                  Treino {day.name}
                </button>
              ))}
            </div>
            <SaveButton workoutPlan={workoutPlan} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Adicionar Exercício ao Treino {workoutPlan.days[selectedDay].name}
            </h2>
            <ExerciseForm onAdd={handleAddExercise} />
          </div>

          <div className="space-y-8">
            {workoutPlan.days.map((day, index) => (
              <WorkoutDay
                key={day.name}
                name={day.name}
                exercises={day.exercises}
                onRemoveExercise={(exerciseIndex) => handleRemoveExercise(index, exerciseIndex)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;