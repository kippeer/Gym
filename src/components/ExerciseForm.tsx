import React from 'react';
import { Exercise, MuscleGroup } from '../types/workout';
import { exercisesByMuscleGroup } from '../data/exercises';

interface ExerciseFormProps {
  onAdd: (exercise: Exercise) => void;
}

export function ExerciseForm({ onAdd }: ExerciseFormProps) {
  const [muscleGroup, setMuscleGroup] = React.useState<MuscleGroup>('peito');
  const [exercise, setExercise] = React.useState<Exercise>({
    name: exercisesByMuscleGroup.peito[0],
    sets: 3,
    reps: 12,
    weight: 0,
    rest: 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(exercise);
    setExercise({
      ...exercise,
      name: exercisesByMuscleGroup[muscleGroup][0],
      sets: 3,
      reps: 12,
      weight: 0,
      rest: 60,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Grupo Muscular</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={muscleGroup}
          onChange={(e) => {
            const newMuscleGroup = e.target.value as MuscleGroup;
            setMuscleGroup(newMuscleGroup);
            setExercise({
              ...exercise,
              name: exercisesByMuscleGroup[newMuscleGroup][0],
            });
          }}
        >
          {Object.keys(exercisesByMuscleGroup).map((group) => (
            <option key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Exercício</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        >
          {exercisesByMuscleGroup[muscleGroup].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Séries</label>
          <input
            type="number"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={exercise.sets}
            onChange={(e) => setExercise({ ...exercise, sets: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Repetições</label>
          <input
            type="number"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, reps: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={exercise.weight}
            onChange={(e) => setExercise({ ...exercise, weight: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descanso (seg)</label>
          <input
            type="number"
            min="0"
            step="5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={exercise.rest}
            onChange={(e) => setExercise({ ...exercise, rest: Number(e.target.value) })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Adicionar Exercício
      </button>
    </form>
  );
}