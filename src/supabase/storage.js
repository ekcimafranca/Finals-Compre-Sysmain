// src/supabase/storage.js
import { supabase } from './client';
import * as Crypto from 'expo-crypto';
import { File } from 'expo-file-system';

export const uploadMedia = async (fileUri, userId, type = 'image') => {
  try {
    const fileId = Crypto.randomUUID();
    const ext = fileUri.split('.').pop()?.split('?')[0] || (type === 'image' ? 'jpg' : 'mp4');
    const fileName = `${fileId}.${ext}`;
    const folder = type === 'image' ? 'images' : 'videos';

    // THIS PATH WORKS WITH RLS [2] → users/{userId}/images/...
    const filePath = `users/${userId}/${folder}/${fileName}`;

    console.log('Uploading to:', filePath);

    // SDK 54+ – no deprecation
    const file = new File(fileUri);
    const base64 = await file.base64();

    if (!base64) throw new Error('Failed to read file');

    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Upload
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, bytes.buffer, {
        contentType: type === 'image' ? 'image/jpeg' : 'video/mp4',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Generate signed URL
    const { data } = await supabase.storage
      .from('media')
      .createSignedUrl(filePath, 60 * 60 * 24 * 365);

    if (!data?.signedUrl) throw new Error('No signed URL');

    return { path: filePath, signedUrl: data.signedUrl };
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
};