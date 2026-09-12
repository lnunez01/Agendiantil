import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function NotFoundScreen() {
  const colors = Colors.light;

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Página no encontrada</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          La ruta que buscas no existe.
        </Text>
        <Link href="/" style={styles.link}>
          Ir a Inicio
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    fontWeight: '500',
    color: '#208AEF',
  },
});