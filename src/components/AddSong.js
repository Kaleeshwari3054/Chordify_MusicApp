import React, { useState } from "react";
import { db } from "../firebase"; // Firebase configuration file
import { collection, addDoc } from "firebase/firestore";

const AddSong = () => {
  const [songTitle, setSongTitle] = useState("");
  const [songUrl, setSongUrl] = useState("");

  const handleAddSong = async () => {
    try {
      const docRef = await addDoc(collection(db, "songs"), {
        title: songTitle,
        url: songUrl,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Song added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add song!");
    }
  };

  return (
    <div>
      <h3>Add Song</h3>
      <input
        type="text"
        placeholder="Enter Song Title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Song URL"
        value={songUrl}
        onChange={(e) => setSongUrl(e.target.value)}
      />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default AddSong;
