import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import "./Routing.css";

const RecentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const audioRef = useRef(null);

  const music = location.state?.music;

  // ✅ Always run the hook outside any condition
  useEffect(() => {
    const checkLibrary = async () => {
      if (currentUser && music?.id) {
        const songRef = doc(db, "users", currentUser.uid, "library", String(music.id));
        const songSnap = await getDoc(songRef);
        setIsSaved(songSnap.exists());
      }
    };
    checkLibrary();
  }, [currentUser, music]);

  // ❌ If music data not available, return early
  if (!music) {
    return <p className="error-message">Error: No song data available.</p>;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLibrary = async () => {
    if (!currentUser) {
      alert("Please log in.");
      return;
    }

    const songRef = doc(db, "users", currentUser.uid, "library", String(music.id));

    if (isSaved) {
      await deleteDoc(songRef);
      alert("Removed from library.");
    } else {
      await setDoc(songRef, {
        songTitle: music.songTitle || "Unknown Title",
        artist: music.artist || "Unknown Artist",
        songUrl: music.songUrl || "",
        songImage: music.songimage || "",
      });
      alert("Added to library.");
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="recent-details-page">
      <h1 className="Heading">Song Details</h1>

      <header className="playlist-header">
        <div className="playlist-info">
          <img src={music.songimage} alt="Playlist" className="playlist-image" />
          <div className="playlist-details">
            <h1 className="playlist-title">This is {music.artist}</h1>
            <p className="playlist-description">The essential tracks, all in one playlist.</p>
            <div className="playlist-actions">
              <button className="play-button" onClick={handlePlayPause}>
                {isPlaying ? "⏸ Pause" : "▶▶▶ Play"}
              </button>
              <button className="save-button" onClick={toggleLibrary}>
                {isSaved ? "− Remove from Library" : "+ Save to Library"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <audio ref={audioRef} src={music.songUrl}></audio>

      <footer className="footer-details">
        <button onClick={() => navigate(-1)} className="footer-btn">
          Back
        </button>
      </footer>
    </div>
  );
};
export default RecentDetails;