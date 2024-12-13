export const workoutSplits = [
  {
    id: 'abc',
    name: 'Treino ABC',
    description: 'Divide o treino em 3 dias, com foco em diferentes grupos musculares.',
    frequency: '3 vezes por semana',
    days: [
      {
        id: 'a',
        name: 'Dia A',
        muscleGroups: ['1','2','3', '4','5', '6'], // Peito, ombro e tríceps
      },
      {
        id: 'b',
        name: 'Dia B',
        muscleGroups: ['1','2','3', '4','5', '6'], // Costas e bíceps
      },
      {
        id: 'c',
        name: 'Dia C',
        muscleGroups: ['1','2','3', '4','5', '6'], // Pernas e abdômen
      },
    ],
  },
  {
    id: 'abcd',
    name: 'Treino ABCD',
    description: 'A divisão é feita de maneira mais detalhada, focando em grupos musculares específicos durante a semana.',
    frequency: '4 vezes por semana',
    days: [
      {
        id: 'a',
        name: 'Dia A',
        muscleGroups: ['1','2','3', '4','5', '6'], // Peito e tríceps
      },
      {
        id: 'b',
        name: 'Dia B',
        muscleGroups: ['1','2','3', '4','5', '6'], // Costas e bíceps
      },
      {
        id: 'c',
        name: 'Dia C',
        muscleGroups: ['1','2','3', '4','5', '6'], // Pernas
      },
      {
        id: 'd',
        name: 'Dia D',
        muscleGroups: ['1','2','3', '4','5', '6'], // Ombros e abdômen
      },
    ],
  },
] as const;