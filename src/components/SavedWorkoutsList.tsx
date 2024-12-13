import React from 'react';
import { FileDown } from 'lucide-react';
import type { SavedWorkout } from '../types/workout';

interface SavedWorkoutsListProps {
  savedWorkouts: SavedWorkout[];
  onViewPDF: (workout: SavedWorkout) => void;
}

export default function SavedWorkoutsList({ savedWorkouts, onViewPDF }: SavedWorkoutsListProps) {
  if (savedWorkouts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Treinos Salvos</h2>
      <div className="space-y-4">
        {savedWorkouts.map((saved) => (
          <div
            key={saved.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{saved.split.name} - {saved.day.name}</h3>
              <p className="text-sm text-gray-600">
                {new Date(saved.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onViewPDF(saved)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-blue-700"
            >
              <FileDown size={16} />
              Ver PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}