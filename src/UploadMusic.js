// import React, { useState } from "react";
// import { db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";

// const UploadMusic = () => {
//   const [file, setFile] = useState(null);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Upload the file as Base64 to Firestore
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a music file!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const base64 = e.target.result; // Convert file to Base64

//       try {
//         const musicRef = collection(db, "music"); // Create "music" collection
//         await addDoc(musicRef, {
//           name: file.name,
//           data: base64,
//         });
//         alert("Music uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading music:", error);
//         alert("Failed to upload music.");
//       }
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>Upload Music</h2>
//       <input type="file" accept="audio/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
//         Upload Music
//       </button>
//     </div>
//   );
// };

// export default UploadMusic;

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
