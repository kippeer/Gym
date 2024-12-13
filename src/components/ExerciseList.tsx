import React from 'react';
import type { MuscleGroup } from '../types/workout';

interface ExerciseListProps {
  muscleGroups: MuscleGroup[];
  onRemoveExercise: (groupId: string, exerciseId: string) => void;
}

export default function ExerciseList({ 
  muscleGroups, 
  onRemoveExercise 
}: ExerciseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {muscleGroups.map((group) => (
        <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{group.name}</h2>
          {group.exercises.length === 0 ? (
            <p className="text-gray-500">Nenhum exercício adicionado</p>
          ) : (
            <ul className="space-y-4">
              {group.exercises.map((exercise) => (
                <li key={exercise.id} className="border-b pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-sm text-gray-600">
                        {exercise.sets} séries x {exercise.reps} repetições
                      </p>
                      <p className="text-sm text-gray-600">{exercise.weight}kg</p>
                    </div>
                    <button
                      onClick={() => onRemoveExercise(group.id, exercise.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}