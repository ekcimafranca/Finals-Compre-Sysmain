// src/components/NoteCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { VideoView } from 'expo-video';

export default function NoteCard({ note, onPress }) {
  const imageUrls = note.image_paths?.split(',').filter(Boolean) || [];
  const videoUrls = note.video_paths?.split(',').filter(Boolean) || [];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>
        {note.text ? note.text.split('\n')[0] : 'Untitled Note'}
      </Text>

      {note.text && note.text.split('\n').length > 1 && (
        <Text style={styles.previewText} numberOfLines={2}>
          {note.text}
        </Text>
      )}

      {/* Show first image/video as thumbnail */}
      {imageUrls.length > 0 && (
        <Image source={{ uri: imageUrls[0] }} style={styles.thumbnail} resizeMode="cover" />
      )}

      {videoUrls.length > 0 && !imageUrls.length && (
        <VideoView
          source={{ uri: videoUrls[0] }}
          style={styles.thumbnail}
          useNativeControls={false}
          resizeMode="cover"
        />
      )}

      <Text style={styles.date}>
        {new Date(note.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>

      {(imageUrls.length > 1 || videoUrls.length > 1) && (
        <Text style={styles.moreMedia}>
          + {imageUrls.length + videoUrls.length - 1} more
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 12,
  },
  date: {
    fontSize: 13,
    color: '#888',
    textAlign: 'right',
    marginTop: 8,
  },
  moreMedia: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500',
  },
});