import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { WorkoutPlan } from '../types/workout';

const LOGO_TEXT = "💪 FitPlan Pro";

export const generateWorkoutPDF = (workoutPlan: WorkoutPlan) => {
  const doc = new jsPDF();
  
  // Add header with logo text
  doc.setFontSize(24);
  doc.setTextColor(0, 87, 183); // Blue color
  doc.text(LOGO_TEXT, 20, 20);
  
  // Add workout type
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Treino ${workoutPlan.type}`, 20, 35);
  
  let startY = 45;
  
  workoutPlan.days.forEach((day, index) => {
    // Add day header
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 87, 183);
    doc.rect(20, startY, 170, 8, 'F');
    doc.text(`Treino ${day.name}`, 25, startY + 6);
    
    // Add exercises table
    const tableData = day.exercises.map(exercise => [
      exercise.name,
      `${exercise.sets}`,
      `${exercise.reps}`,
      `${exercise.weight}kg`,
      `${exercise.rest}s`
    ]);
    
    autoTable(doc, {
      startY: startY + 10,
      head: [['Exercício', 'Séries', 'Repetições', 'Peso', 'Descanso']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
      },
    });
    
    startY = (doc as any).lastAutoTable.finalY + 20;
    
    // Add new page if needed
    if (startY > 250 && index < workoutPlan.days.length - 1) {
      doc.addPage();
      startY = 20;
    }
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  return doc;
};