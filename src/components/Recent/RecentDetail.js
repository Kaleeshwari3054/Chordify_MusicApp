// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../../components/AuthContext";
// import { db } from "../../firebase";
// import { doc, getDoc,deleteDoc,setDoc } from "firebase/firestore";
// import "./RecentDetail.css";

// const RecentDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   const [music, setMusic] = useState(location.state?.music || null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const audioRef = useRef(null);

//   // 🔁 If no state is passed, fetch from Firestore by ID
//   useEffect(() => {
//     const fetchMusic = async () => {
//       if (!music && id) {
//         const songRef = doc(db, "songs", id);
//         const songSnap = await getDoc(songRef);
//         if (songSnap.exists()) {
//           setMusic(songSnap.data());
//         } else {
//           console.log("No song data found!");
//         }
//       }
//     };
//     fetchMusic();
//   }, [id, music]);

//   useEffect(() => {
//     if (music) {
//       document.title = `Chordify 🎵 - ${music.title || "Song Details"}`;

//       const checkLibrary = async () => {
//         if (currentUser && music?.id) {
//           const songRef = doc(db, "users", currentUser.uid, "library", String(music.id));
//           const songSnap = await getDoc(songRef);
//           setIsSaved(songSnap.exists());
//         }
//       };

//       checkLibrary();
//     }
//   }, [currentUser, music]);

//   const handlePlayPause = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleLibrary = async () => {
//     if (!currentUser) {
//       alert("Please log in to use the library feature.");
//       return;
//     }

//     const songRef = doc(db, "users", currentUser.uid, "library", String(music.id));

//     try {
//       if (isSaved) {
//         await deleteDoc(songRef);
//         alert("Removed from library.");
//       } else {
//         await setDoc(songRef, { ...music });
//         alert("Added to library.");
//       }
//       setIsSaved(!isSaved);
//     } catch (error) {
//       console.error("Library operation failed:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   if (!music) {
//     return <p className="error-message">❌ No song data available.</p>;
//   }

//   return (
//     <div className="recent-details-page">
//       <h1 className="page-title">Song Details</h1>

//       <div className="song-header">
//         <img
//           src={music?.media?.cover_image_url || "https://via.placeholder.com/250"}
//           alt={music.title || "Song Cover"}
//           className="song-cover"
//         />

//         <div className="song-info">
//           <h2>{music.title || "Untitled Song"}</h2>
//           <p><strong>Artist:</strong> {music.artists?.singers?.join(", ") || "N/A"}</p>
//           <p><strong>Duration:</strong> {music.duration || "N/A"} seconds</p>
//           <p><strong>Language:</strong> {music.language || "N/A"}</p>
//           <p><strong>Release Date:</strong> {music.release_date || "N/A"}</p>
//           <p><strong>Genre:</strong> {music.genre?.join(", ") || "N/A"}</p>
//           <p><strong>Album:</strong> {music.album?.name || "N/A"} ({music.album?.release_year || "N/A"})</p>
//           <p><strong>Movie:</strong> {music.movie?.title || "N/A"}</p>
//           <p><strong>Director:</strong> {music.movie?.director || "N/A"}</p>
//           <p><strong>Producers:</strong> {music.movie?.producers?.join(", ") || "N/A"}</p>
//           <p><strong>Music Directors:</strong> {music.artists?.music_directors?.join(", ") || "N/A"}</p>
//           <p><strong>Lyricists:</strong> {music.artists?.lyricists?.join(", ") || "N/A"}</p>
//           <p><strong>Likes:</strong> {music.metadata?.likes?.toLocaleString() || "0"}</p>
//           <p><strong>Plays:</strong> {music.metadata?.plays?.toLocaleString() || "0"}</p>

//           <div className="button-group">
//             <button className="green-button" onClick={handlePlayPause}>
//               {isPlaying ? "⏸ Pause" : "▶ Play"}
//             </button>
//             <button className="green-button" onClick={toggleLibrary}>
//               {isSaved ? "− Remove from Library" : "+ Save to Library"}
//             </button>
//             <button className="white-button" onClick={() => navigate(-1)}>
//               ← Back
//             </button>
//           </div>
//         </div>
//       </div>

//       <audio ref={audioRef} src={music.media?.audio_url}></audio>
//     </div>
//   );
// };

// export default RecentDetail;

import React from "react";
import { useParams, Link } from "react-router-dom";
import musicData from "./RecentDetail.json"; // adjust path if needed
import "../../styles.css"; // if you use external CSS

const RecentDetail = () => {
  const { id } = useParams();

  // Flatten all songs into one array
  const allSongs = Object.values(musicData).flat();

  // Find the song by ID
  const song = allSongs.find((item) => item.id === id);

  if (!song) {
    return <div>Song not found.</div>;
  }

  return (
    <div className="recent-details-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="song-header">
        <img src={song.media?.cover_image_url} alt={song.title} className="song-cover" />
        <div className="song-info">
          <h2>{song.title}</h2>
          <p><strong>Language:</strong> {song.language}</p>
          <p><strong>Duration:</strong> {song.duration} seconds</p>
          <p><strong>Release Date:</strong> {song.release_date}</p>
          <p><strong>Genre:</strong> {song.genre.join(", ")}</p>
        </div>
      </div>

      <div className="section">
        <h3>🎧 Album & Movie Info</h3>
        <p><strong>Album:</strong> {song.album.name} ({song.album.release_year})</p>
        <p><strong>Movie:</strong> {song.movie.title}</p>
        <p><strong>Director:</strong> {song.movie.director}</p>
        <p><strong>Producers:</strong> {song.movie.producers.join(", ")}</p>
      </div>

      <div className="section">
        <h3>🎤 Artists</h3>
        <p><strong>Singers:</strong> {song.artists.singers.join(", ")}</p>
        <p><strong>Music Directors:</strong> {song.artists.music_directors.join(", ")}</p>
        <p><strong>Lyricists:</strong> {song.artists.lyricists.join(", ")}</p>
      </div>

      <div className="section">
        <h3>📈 Song Stats</h3>
        <p><strong>Likes:</strong> {song.metadata.likes.toLocaleString()}</p>
        <p><strong>Plays:</strong> {song.metadata.plays.toLocaleString()}</p>
      </div>

      <div className="section">
        <h3>▶️ Listen</h3>
        <audio controls src={song.media.audio_url} className="audio-player" />
      </div>

      
    </div>
  );
};

export default RecentDetail;
