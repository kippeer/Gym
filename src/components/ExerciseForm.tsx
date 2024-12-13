import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Exercise } from '../types/workout';
import { exercisesByMuscleGroup } from '../data/exercises';

interface ExerciseFormProps {
  onAdd: (exercise: Exercise) => void;
  selectedGroupId: string;
}

export default function ExerciseForm({ onAdd, selectedGroupId }: ExerciseFormProps) {
  const [exercise, setExercise] = useState<Exercise>({
    id: '',
    name: '',
    sets: 3,
    reps: 12,
    weight: 0,
  });

  const getExerciseList = (groupId: string) => {
    const groupMap: Record<string, keyof typeof exercisesByMuscleGroup> = {
      '1': 'peito',
      '2': 'costas',
      '3': 'pernas',
      '4': 'ombros',
      '5': 'biceps',
      '6': 'triceps',
      '7': 'abdomen',
    };
    return exercisesByMuscleGroup[groupMap[groupId]] || [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise.name) return;
    onAdd({ ...exercise, id: crypto.randomUUID() });
    setExercise({ id: '', name: '', sets: 3, reps: 12, weight: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="exercise" className="block text-sm font-medium text-gray-700 mb-1">
          Exercício
        </label>
        <select
          id="exercise"
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Selecione um exercício</option>
          {getExerciseList(selectedGroupId).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
            Séries
          </label>
          <input
            id="sets"
            type="number"
            value={exercise.sets}
            onChange={(e) => setExercise({ ...exercise, sets: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md"
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
            Repetições
          </label>
          <input
            id="reps"
            type="number"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, reps: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md"
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Peso (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={exercise.weight}
            onChange={(e) => setExercise({ ...exercise, weight: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md"
            min="0"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Adicionar Exercício
      </button>
    </form>
  );
}