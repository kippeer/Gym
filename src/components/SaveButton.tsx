import React from 'react';
import { Save } from 'lucide-react';
import { WorkoutPlan } from '../types/workout';
import { generateWorkoutPDF } from '../utils/pdfGenerator';

interface SaveButtonProps {
  workoutPlan: WorkoutPlan;
}

export function SaveButton({ workoutPlan }: SaveButtonProps) {
  const handleSave = () => {
    const doc = generateWorkoutPDF(workoutPlan);
    doc.save(`treino-${workoutPlan.type.toLowerCase()}.pdf`);
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
    >
      <Save size={20} />
      Salvar PDF
    </button>
  );
}