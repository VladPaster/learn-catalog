import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import type { Resource } from '../types';

type ResourceDetailsProps = {
  resource: Resource;
  savedNote: string;
  onSave: (text: string) => void;
  onBack: () => void;
};

export default function ResourceDetails(props: ResourceDetailsProps) {
  const [draft, setDraft] = useState(props.savedNote);
  const [message, setMessage] = useState('');

  function handleSave() {
    const cleaned = draft.trim();
    if (cleaned.length === 0) {
      setMessage('Введіть текст примітки.');
      return;
    }
    if (cleaned.length > 120) {
      setMessage('Примітка задовга: скоротіть текст до 120 символів.');
      return;
    }
    props.onSave(cleaned);
    setDraft(cleaned);
    setMessage('Примітку збережено до закриття застосунку.');
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <Pressable
        onPress={props.onBack}
        style={styles.backButton}
        accessibilityRole="button"
      >
        <Text style={styles.backText}>До каталогу</Text>
      </Pressable>

      <Text style={styles.title}>{props.resource.title}</Text>
      <Text style={styles.meta}>{props.resource.minutes} хв</Text>

      <Text style={styles.label}>Власна примітка (1–120 символів)</Text>
      <TextInput
        value={draft}
        onChangeText={text => {
          setDraft(text);
          setMessage('');
        }}
        multiline
        accessibilityLabel="Власна примітка"
        style={styles.input}
      />

      <Pressable
        onPress={handleSave}
        style={styles.saveButton}
        accessibilityRole="button"
      >
        <Text style={styles.saveText}>Зберегти примітку</Text>
      </Pressable>

      <Text accessibilityLiveRegion="polite" style={styles.message}>
        {message}
      </Text>

      <Text style={styles.label}>Збережена примітка:</Text>
      <Text style={styles.saved}>
        {props.savedNote === '' ? 'Ще немає примітки' : props.savedNote}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  backButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
    marginBottom: 16,
  },
  backText: { fontSize: 16, color: '#4F46E5' },
  title: { fontSize: 26, fontWeight: '700', color: '#1F2937' },
  meta: { fontSize: 18, color: '#4B5563', marginTop: 4, marginBottom: 16 },
  label: { fontSize: 16, color: '#1F2937', marginBottom: 6, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    minHeight: 48,
    marginTop: 12,
    justifyContent: 'center',
    borderRadius: 8,
  },
  saveText: { fontSize: 16, color: '#FFFFFF', textAlign: 'center' },
  message: { fontSize: 16, color: '#1F2937', marginTop: 10 },
  saved: { fontSize: 16, color: '#4B5563' },
});