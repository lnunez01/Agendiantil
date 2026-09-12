import { Stack, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function ModalScreen() {
  const router = useRouter();
  const colors = Colors.light;

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.text }]}>Nueva tarea</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Registra una nueva tarea y mantén tus entregas bajo control.
        </Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Nombre de la tarea</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.backgroundElement, color: colors.text }]}
            placeholder="Ej: Ensayo de Historia"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Materia</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.backgroundElement, color: colors.text }]}
            placeholder="Ej: Historia"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Fecha de entrega</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.backgroundElement, color: colors.text }]}
            placeholder="Ej: 15 Oct"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea, { borderColor: colors.backgroundElement, color: colors.text }]}
            placeholder="Detalles de la tarea..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            onPress={() => router.back()}>
            <Text style={styles.primaryButtonText}>Crear tarea</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
            onPress={() => router.back()}>
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttons: {
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#208AEF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#208AEF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.7,
  },
});