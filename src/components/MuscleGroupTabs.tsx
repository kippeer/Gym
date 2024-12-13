import React from 'react';
import type { MuscleGroup } from '../types/workout';

interface MuscleGroupTabsProps {
  muscleGroups: MuscleGroup[];
  selectedGroup: string;
  onSelectGroup: (id: string) => void;
}

export default function MuscleGroupTabs({ 
  muscleGroups, 
  selectedGroup, 
  onSelectGroup 
}: MuscleGroupTabsProps) {
  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {muscleGroups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelectGroup(group.id)}
          className={`p-2 rounded-md text-sm font-medium ${
            selectedGroup === group.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {group.name}
        </button>
      ))}
    </div>
  );
}