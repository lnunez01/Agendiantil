import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';

type Task = {
  id: string;
  title: string;
  subject: string;
  date: string;
  accent: string;
  status: string;
};

const TASKS: Task[] = [
  {
    id: '1024',
    title: 'Ensayo de Historia',
    subject: 'Historia',
    date: '15 Oct',
    accent: '#E8590C',
    status: 'Pendiente',
  },
  {
    id: '1025',
    title: 'Proyecto de Programación',
    subject: 'Programación',
    date: '18 Oct',
    accent: '#1971C2',
    status: 'En progreso',
  },
  {
    id: '1026',
    title: 'Exposición de Base de Datos',
    subject: 'Base de Datos',
    date: '20 Oct',
    accent: '#2F9E44',
    status: 'Próxima',
  },
];

export default function TasksScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const [query, setQuery] = useState('');

  const filtered = TASKS.filter((task) =>
    `${task.title} ${task.subject}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <FlatList
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      data={filtered}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          <Text style={[styles.brand, { color: colors.textSecondary }]}>Agendiantil</Text>
          <Text style={[styles.title, { color: colors.text }]}>Mis tareas</Text>

          <View style={[styles.searchBar, { borderColor: colors.backgroundElement }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar tareas..."
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
            />
          </View>
        </>
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.taskCard, pressed && styles.pressed]}
          onPress={() => router.push(`/task/${item.id}`)}>
          <View style={[styles.accentBar, { backgroundColor: item.accent }]} />
          <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.taskSubject, { color: colors.textSecondary }]}>
              {item.subject}
            </Text>
          </View>
          <View style={styles.badges}>
            <View style={[styles.statusChip, { backgroundColor: item.accent + '1A' }]}>
              <Text style={[styles.statusText, { color: item.accent }]}>{item.status}</Text>
            </View>
            <Text style={[styles.dateText, { color: item.accent }]}>{item.date}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
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
  badges: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});