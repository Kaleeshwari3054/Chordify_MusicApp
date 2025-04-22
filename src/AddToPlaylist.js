// src/firebase/addToPlaylist.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addToPlaylist = async (userId, playlistType, song) => {
  try {
    const docRef = doc(db, "users", userId, "playlists", playlistType);
    const docSnap = await getDoc(docRef);

    let songs = [];

    if (docSnap.exists()) {
      songs = docSnap.data().songs || [];
    }

    // Avoid duplicates
    const alreadyExists = songs.find((item) => item.id === song.id);
    if (!alreadyExists) {
      songs.push(song);
    }

    await setDoc(docRef, { songs });

    console.log("✅ Added to playlist:", playlistType);
  } catch (error) {
    console.error("❌ Error adding to playlist:", error);
  }
};
