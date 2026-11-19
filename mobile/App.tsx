import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ResourceCard from './src/components/ResourceCard';
import ResourceDetails from './src/components/ResourceDetails';
import { resources } from './src/data/resources';

export default function App() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  function toggleFavorite(id: number) {
    setFavorites(previous => ({
      ...previous,
      [id]: !previous[id],
    }));
  }

  function saveNote(id: number, text: string) {
    setNotes(previous => ({
      ...previous,
      [id]: text,
    }));
  }

  const selected = resources.find(resource => resource.id === selectedId);

  const term = query.trim().toLowerCase();
  const visible = resources.filter(resource =>
    resource.title.toLowerCase().includes(term)
  );

  if (selectedId !== null) {
    if (!selected) {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.screen}>
            <Text style={styles.empty}>Ресурс не знайдено</Text>
            <Pressable
              onPress={() => setSelectedId(null)}
              style={styles.clearButton}
              accessibilityRole="button"
            >
              <Text style={styles.clearText}>До каталогу</Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <ResourceDetails
            key={selected.id}
            resource={selected}
            savedNote={notes[selected.id] ?? ''}
            onSave={text => saveNote(selected.id, text)}
            onBack={() => setSelectedId(null)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Image
            source={require('./assets/resource.png')}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Навчальний ресурс"
          />
          <Text style={styles.heading}>Мій каталог навчання</Text>
        </View>

        <Text style={styles.label}>Пошук за назвою</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Пошук за назвою"
          style={styles.input}
        />

        <View style={styles.infoRow}>
          <Text style={styles.count}>Знайдено: {visible.length}</Text>
          <Pressable
            onPress={() => setQuery('')}
            style={styles.clearButton}
            accessibilityRole="button"
          >
            <Text style={styles.clearText}>Очистити пошук</Text>
          </Pressable>
        </View>

        <FlatList
          data={visible}
          extraData={{ favorites, notes }}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ResourceCard
              resource={item}
              isFavorite={Boolean(favorites[item.id])}
              onToggle={() => toggleFavorite(item.id)}
              onOpen={() => setSelectedId(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              За цим запитом нічого не знайдено. Змініть запит або натисніть
              «Очистити пошук».
            </Text>
          }
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, backgroundColor: '#EEF2FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  image: { width: 48, height: 48 },
  heading: { flex: 1, fontSize: 26, fontWeight: '700' },
  label: { fontSize: 16, marginBottom: 6, color: '#1F2937' },
  input: {
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  count: { fontSize: 16, color: '#1F2937' },
  clearButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  clearText: { fontSize: 16, color: '#4F46E5' },
  list: { gap: 12, paddingBottom: 20 },
  empty: { fontSize: 16, color: '#4B5563' },
});