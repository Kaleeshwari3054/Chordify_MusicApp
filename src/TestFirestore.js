import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const TestFirestore = () => {
  const addTestSong = async () => {
    try {
      await addDoc(collection(db, "songs"), {
        id: 1,
        musicDirector: "Test Director",
        movie: "Test Movie",
        songimage: "https://example.com/test.jpg",
        songTitle: "Test Song",
        songUrl: "https://example.com/test.mp3",
      });
      alert("Test song added successfully!");
    } catch (error) {
      console.error("Error adding test song:", error);
      alert("Failed to add test song. Check console for details.");
    }
  };

  return (
    <div>
      <button onClick={addTestSong}>Add Test Song</button>
    </div>
  );
};

export default TestFirestore;
