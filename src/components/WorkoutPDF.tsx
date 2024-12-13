import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import type { SavedWorkout } from '../types/workout';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  dayTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  muscleGroup: {
    marginBottom: 15,
  },
  muscleGroupTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    padding: 5,
  },
  exercise: {
    marginBottom: 8,
    padding: 5,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

interface WorkoutPDFProps {
  workout: SavedWorkout;
}

export default function WorkoutPDF({ workout }: WorkoutPDFProps) {
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>{workout.name}</Text>
          <Text style={styles.subtitle}>
            {workout.split.name} - {workout.day.name}
          </Text>
          <Text style={styles.date}>
            {new Date(workout.date).toLocaleDateString()}
          </Text>
          
          {workout.muscleGroups.map((group) => (
            <View key={group.id} style={styles.muscleGroup}>
              <Text style={styles.muscleGroupTitle}>{group.name}</Text>
              {group.exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exercise}>
                  <Text>{exercise.name}</Text>
                  <View style={styles.exerciseDetails}>
                    <Text>Séries: {exercise.sets}</Text>
                    <Text>Repetições: {exercise.reps}</Text>
                    <Text>Peso: {exercise.weight}kg</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}