// src/screens/NoteScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../supabase/client';
import MediaUploader from '../components/MediaUploader';
import { VideoView } from 'expo-video';

export default function NoteScreen({ route, navigation }) {
  const { note: initialNote } = route.params || {};
  const isNew = !initialNote;

  const [text, setText] = useState(initialNote?.text || '');
  const [imageUrls, setImageUrls] = useState([]); // Signed URLs only
  const [videoUrls, setVideoUrls] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // Load existing signed URLs from DB (if editing)
  useEffect(() => {
    if (initialNote) {
      setText(initialNote.text || '');
      setImageUrls(initialNote.image_paths?.split(',').filter(Boolean) || []);
      setVideoUrls(initialNote.video_paths?.split(',').filter(Boolean) || []);
    }
  }, [initialNote]);

  const handleUpload = (signedUrl, type) => {
    if (type === 'image') {
      setImageUrls(prev => [...prev, signedUrl]);
    } else {
      setVideoUrls(prev => [...prev, signedUrl]);
    }
  };

  const saveNote = async () => {
    if (!text.trim()) return Alert.alert('Error', 'Note cannot be empty');

    const noteData = {
      text: text.trim(),
      image_paths: imageUrls.join(','),
      video_paths: videoUrls.join(','),
    };

    const { error } = isNew
      ? await supabase.from('notes').insert({ ...noteData, user_id: user.id })
      : await supabase.from('notes').update(noteData).eq('id', initialNote.id);

    if (error) Alert.alert('Save failed', error.message);
    else navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Start typing your note..."
          multiline
          value={text}
          onChangeText={setText}
        />

        {/* LIVE PREVIEW */}
        {imageUrls.map((url, i) => (
          <Image key={i} source={{ uri: url }} style={styles.preview} resizeMode="cover" />
        ))}

        {videoUrls.map((url, i) => (
          <VideoView key={i} source={{ uri: url }} style={styles.preview} nativeControls />
        ))}

        {user && <MediaUploader userId={user.id} onUploadSuccess={handleUpload} />}

        <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
          <Text style={styles.saveText}>Save Note</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 20 },
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    fontSize: 17,
    minHeight: 200,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  preview: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#000',
  },
  saveBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: 'white', fontSize: 17, fontWeight: '600' },
});