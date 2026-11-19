import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Resource } from '../types';

type ResourceCardProps = {
  resource: Resource;
  isFavorite: boolean;
  onToggle: () => void;
  onOpen: () => void;
};

export default function ResourceCard(props: ResourceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.resource.title}</Text>
      <Text style={styles.meta}>
        ID: {props.resource.id} · {props.resource.minutes} хв
      </Text>
      <Text style={props.isFavorite ? styles.statusOn : styles.statusOff}>
        {props.isFavorite ? 'В обраному' : 'Не в обраному'}
      </Text>
      <Pressable
        onPress={props.onToggle}
        style={styles.button}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          {props.isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
        </Text>
      </Pressable>
      <Pressable
        onPress={props.onOpen}
        style={styles.openButton}
        accessibilityRole="button"
      >
        <Text style={styles.openText}>Відкрити деталі</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#1F2937' },
  meta: { fontSize: 16, color: '#4B5563', marginTop: 4 },
  statusOff: { fontSize: 16, color: '#4B5563', marginTop: 8 },
  statusOn: { fontSize: 18, fontWeight: '700', color: '#166534', marginTop: 8 },
  button: {
    backgroundColor: '#4F46E5',
    padding: 12,
    minHeight: 48,
    marginTop: 12,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { fontSize: 16, color: '#FFFFFF', textAlign: 'center' },
  openButton: {
    minHeight: 48,
    marginTop: 8,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  openText: { fontSize: 16, color: '#4F46E5', textAlign: 'center' },
});