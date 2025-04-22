import React from 'react';
import recentPlayedData from '../data/recentPlayedData.json'; // your JSON file
// import './RecentPlayed.css'; // your styling file

const RecentPlayed = () => {
  return (
    <div className="recent-played-container">
      <h2 className="recent-played-title">Recently Played Songs</h2>

      {recentPlayedData.map((song) => (
        <div className="song-card" key={song.id}>
          <img
            src={song.media?.imageUrl || 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'}
            alt={song.title}
            className="song-image"
          />
          <div className="song-details">
            <h3>{song.title}</h3>
            <p><strong>Movie:</strong> {song.movie || "Not Mentioned"}</p>
            <p><strong>Album:</strong> {song.album || "Not Mentioned"}</p>
            <p><strong>Genre:</strong> {song.genre || "Not Mentioned"}</p>
            <p><strong>Release Date:</strong> {song.release_date || "Not Mentioned"}</p>
            <p><strong>Language:</strong> {song.language || "Not Mentioned"}</p>
            <p><strong>Duration:</strong> {song.duration || "Not Mentioned"}</p>
            <p><strong>Artists:</strong> {song.artists ? song.artists.join(", ") : "Not Mentioned"}</p>
            <p><strong>Likes:</strong> {song.metadata?.likes ?? 0}</p>
            <p><strong>Plays:</strong> {song.metadata?.plays ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPlayed;
