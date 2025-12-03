React Native + Supabase

A beautiful, fully functional **Notes-style mobile app** built with **React Native (Expo)** and **Supabase** as the backend. Supports user authentication, full CRUD operations, and media uploads (images & videos) with secure per-user storage.

**Live APK Download**:  
[https://drive.google.com/file/d/1fG9kL8vN5rT2xQeRtY8uI0oP9kL2mN5v/view?usp=sharing](https://drive.google.com/drive/folders/1YjLniTfb2p8NpHF8u8wYpDNTLO9RYEca?usp=sharing)

<img src="https://i.ibb.co.com/4p3v7nJ/notes-preview-1.jpg" width="300" /> <img src="https://i.ibb.co.com/8Xj5fKp/notes-preview-2.jpg" width="300" />

## Group Members
- **Leader**: Julito Villaraza
- [Member 2 Full Name]
- [Member 3 Full Name]
- [Member 4 Full Name] *(if applicable)*

## Features
- User Authentication (Sign Up / Sign In) with Supabase Auth
- Create, Read, Update, Delete notes (full CRUD)
- Rich text notes with **images and videos**
- Media uploads to Supabase Storage (private per-user folders)
- Instant preview of uploaded media while typing
- Media appears in note list after saving
- Clean, modern UI inspired by **Apple Notes**
- Secure Row-Level Security (RLS) policies
- Works offline-first (cached media)
- Built with Expo (EAS Build ready)

## Tech Stack
- **Frontend**: React Native + Expo (SDK 54)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Media Handling**: expo-image-picker, expo-video, expo-file-system
- **State Management**: React Hooks + Context (optional)
- **Navigation**: React Navigation

## Project Structure
src/
├── components/       # Reusable UI components (NoteCard, MediaUploader)
├── screens/          # HomeScreen, NoteScreen, Auth screens
├── supabase/         # Supabase client & storage utils
└── navigation/       # App navigation setup


## Setup & Installation

### Prerequisites
- Node.js (v18+)
- Expo CLI or EAS CLI
- Expo Go app (for testing on phone)

### Steps
1. **Clone the repository**
   git clone https://ekcimafranca/Finals-Compre-Sysmain-clone.git
   cd notes-app

   **Install dependencies**
   npm install or
    yarn install


