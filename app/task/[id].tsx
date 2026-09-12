import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = Colors.light;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Encabezado con botón para regresar */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={[styles.backText, { color: colors.text }]}>Atrás</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Detalle de tarea</Text>

        {/* Tarjeta principal de la tarea */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Ensayo de Historia</Text>
          <Text style={[styles.cardSubject, { color: colors.textSecondary }]}>
            Materia: Historia
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.backgroundElement }]} />

          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Fecha de entrega</Text>
            <Text style={[styles.rowValue, { color: colors.text }]}>15 Oct</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Hora</Text>
            <Text style={[styles.rowValue, { color: colors.text }]}>11:59 PM</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Materia</Text>
            <Text style={[styles.rowValue, { color: colors.text }]}>Historia</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.backgroundElement }]} />

          <Text style={[styles.descriptionLabel, { color: colors.textSecondary }]}>
            Descripción
          </Text>
          <Text style={[styles.descriptionText, { color: colors.text }]}>
            Redactar un ensayo de 5 páginas sobre los movimientos sociales del siglo XX y entregarlo
            a través de la plataforma de la universidad antes de la fecha límite.
          </Text>
        </View>

        {/* ID dinámico */}
        <View style={styles.idCard}>
          <Text style={[styles.idText, { color: colors.textSecondary }]}>
            ID de tarea: <Text style={styles.idHighlight}>{id}</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backIcon: {
    fontSize: 18,
    color: '#208AEF',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    paddingTop: 12,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubject: {
    fontSize: 14,
  },
  divider: {
    height: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 14,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  descriptionLabel: {
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  idCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },
  idText: {
    fontSize: 15,
    fontWeight: '600',
  },
  idHighlight: {
    color: '#208AEF',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});