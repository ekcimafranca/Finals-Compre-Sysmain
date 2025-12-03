// src/components/MediaUploader.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadMedia } from '../supabase/storage';

export default function MediaUploader({ userId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  const pickAndUpload = async (mediaType) => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Allow access to photos to upload media.');
      return;
    }

    // Open picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        mediaType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    // User canceled
    if (result.canceled) {
      return;
    }

    const uri = result.assets[0].uri;
    if (!uri) {
      Alert.alert('Error', 'Could not get file from picker');
      return;
    }

    setUploading(true);

    try {
      console.log('Starting upload for:', uri);

      // This returns { path, signedUrl }
      const uploadResult = await uploadMedia(uri, userId, mediaType);

      // Pass the signed URL directly — preview appears instantly!
      onUploadSuccess(uploadResult.signedUrl, mediaType);

      console.log('Upload success! Preview should now appear.');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert(
        'Upload Failed',
        error.message || 'Something went wrong. Check console for details.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attach Media</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={() => pickAndUpload('image')}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>Image</Text>
        </TouchableOpacity>

        <View style={{ width: 16 }} />

        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={() => pickAndUpload('video')}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>
      </View>

      {uploading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  buttonDisabled: {
    backgroundColor: '#A0C4FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loadingText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 15,
  },
});