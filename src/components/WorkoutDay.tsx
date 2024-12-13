import React from 'react';
import { Exercise } from '../types/workout';
import { Trash2 } from 'lucide-react';

interface WorkoutDayProps {
  name: string;
  exercises: Exercise[];
  onRemoveExercise: (index: number) => void;
}

export function WorkoutDay({ name, exercises, onRemoveExercise }: WorkoutDayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Treino {name}</h2>
      {exercises.length === 0 ? (
        <p className="text-gray-500">Nenhum exercício adicionado</p>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              <div className="flex-1">
                <h3 className="font-semibold">{exercise.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="mr-4">{exercise.sets} séries</span>
                  <span className="mr-4">{exercise.reps} repetições</span>
                  <span className="mr-4">{exercise.weight}kg</span>
                  <span>{exercise.rest}s descanso</span>
                </div>
              </div>
              <button
                onClick={() => onRemoveExercise(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}