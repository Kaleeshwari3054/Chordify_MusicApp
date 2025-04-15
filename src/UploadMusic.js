import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const UploadMusic = () => {
  const [songName, setSongName] = useState("");
  const [songUrl, setSongUrl] = useState("");

  const handleUpload = async () => {
    if (!songName || !songUrl) {
      alert("Please enter both song name and URL!");
      return;
    }

    try {
      const musicRef = collection(db, "musicLinks"); // Firestore collection
      await addDoc(musicRef, {
        name: songName,
        url: songUrl,
      });

      alert("Music link added successfully!");
      setSongName(""); // Clear input fields
      setSongUrl("");
    } catch (error) {
      console.error("Error adding music:", error);
      alert("Failed to add music link.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Add Music Link</h2>
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Enter music URL"
        value={songUrl}
        onChange={(e) => setSongUrl(e.target.value)}
      />
      <br /><br />
      <button onClick={handleUpload}>Add Music</button>
    </div>
  );
};

export default UploadMusic;
