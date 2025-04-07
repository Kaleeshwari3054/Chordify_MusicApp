import React, { useState } from "react";
import "./MusicPlayer.css"; 
import musicData from "./MusicData.json"; // Import your JSON file

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);

  const handlePlay = (songUrl) => {
    setCurrentSong(songUrl);
  };

  return (
    <div className="music-player-container">
      <h1>🎵 Music Player 🎶</h1>
      <div className="song-list">
        {musicData.map((song) => (
          <div key={song.id} className="song-card">
            <img src={song.songimage || song.image} alt={song.songTitle} className="song-image" />
            <h3>{song.songTitle}</h3>
            <p>🎬 Movie: {song.movie}</p>
            <p>🎹 Music Director: {song.musicDirector}</p>
            <button
              className="play-button"
              onClick={() => handlePlay(song.songUrl)}
              disabled={!song.songUrl}
            >
              {song.songUrl ? "▶ Play" : "❌ Not Available"}
            </button>
          </div>
        ))}
      </div>
      {currentSong && (
        <div className="audio-player">
          <audio controls autoPlay>
            <source src={currentSong} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
