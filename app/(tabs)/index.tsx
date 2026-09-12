import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

type Task = {
  id: string;
  title: string;
  subject: string;
  date: string;
  accent: string;
};

const TASKS: Task[] = [
  {
    id: '1024',
    title: 'Ensayo de Historia',
    subject: 'Historia',
    date: '15 Oct',
    accent: '#E8590C',
  },
  {
    id: '1025',
    title: 'Proyecto de Programación',
    subject: 'Programación',
    date: '18 Oct',
    accent: '#1971C2',
  },
  {
    id: '1026',
    title: 'Exposición de Base de Datos',
    subject: 'Base de Datos',
    date: '20 Oct',
    accent: '#2F9E44',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const colors = Colors.light;

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}>
      {/* Encabezado */}
      <Text style={[styles.title, { color: colors.text }]}>Agendiantil</Text>
      <Text style={[styles.greeting, { color: colors.textSecondary }]}>¡Hola! 👋</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Organiza tus tareas y mantén tus entregas bajo control.
      </Text>

      {/* Tarjeta de resumen */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Tareas pendientes</Text>
        <Text style={styles.summaryCount}>5</Text>
      </View>

      {/* Próximas entregas */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Próximas entregas</Text>

      {TASKS.map((task) => (
        <Pressable
          key={task.id}
          style={({ pressed }) => [styles.taskCard, pressed && styles.pressed]}
          onPress={() => router.push(`/task/${task.id}`)}>
          <View style={[styles.accentBar, { backgroundColor: task.accent }]} />
          <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>{task.title}</Text>
            <Text style={[styles.taskSubject, { color: colors.textSecondary }]}>
              {task.subject}
            </Text>
          </View>
          <View style={[styles.dateBadge, { backgroundColor: task.accent + '1A' }]}>
            <Text style={[styles.dateText, { color: task.accent }]}>{task.date}</Text>
          </View>
        </Pressable>
      ))}

      {/* Botón Nueva tarea — navega al Modal */}
      <Link href="/modal" asChild>
        <Pressable style={({ pressed }) => [styles.linkPressable, pressed && styles.pressed]}>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Nueva tarea</Text>
          </View>
        </Pressable>
      </Link>

      {/* Botón ruta dinámica */}
      <Pressable
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        onPress={() => router.push('/task/1024')}>
        <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
          Ver detalle de tarea 1024
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#208AEF',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#208AEF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryCount: {
    color: '#ffffff',
    fontSize: 44,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 12,
    marginBottom: 12,
    gap: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
  },
  taskInfo: {
    flex: 1,
    gap: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskSubject: {
    fontSize: 14,
  },
  dateBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  linkPressable: {
    alignItems: 'stretch',
  },
  primaryButton: {
    backgroundColor: '#208AEF',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#208AEF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    fontWeight: '500',
  },
});