import React from 'react';
import type { WorkoutSplit, WorkoutDay } from '../types/workout';
import { workoutSplits } from '../data/workoutSplits';

interface WorkoutSplitSelectorProps {
  onSelectSplit: (split: WorkoutSplit) => void;
  onSelectDay: (day: WorkoutDay) => void;
  selectedSplit?: WorkoutSplit;
  selectedDay?: WorkoutDay;
}

export default function WorkoutSplitSelector({
  onSelectSplit,
  onSelectDay,
  selectedSplit,
  selectedDay,
}: WorkoutSplitSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Selecione seu Treino</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workoutSplits.map((split) => (
          <div
            key={split.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedSplit?.id === split.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400'
            }`}
            onClick={() => onSelectSplit(split)}
          >
            <h3 className="text-lg font-medium mb-2">{split.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{split.description}</p>
            <p className="text-gray-600 text-sm">Frequência: {split.frequency}</p>
          </div>
        ))}
      </div>

      {selectedSplit && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Selecione o Dia</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedSplit.days.map((day) => (
              <button
                key={day.id}
                onClick={() => onSelectDay(day)}
                className={`p-3 rounded-md text-center transition-colors ${
                  selectedDay?.id === day.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}