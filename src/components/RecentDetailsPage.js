import React from "react";
import { useLocation, Link } from "react-router-dom";
// import "./styles.css"; // if you are using external CSS

const RecentDetails = () => {
  const location = useLocation();
  const song = location.state;

  if (!song) {
    return <div>No song data found</div>;
  }

  return (
    <div className="recent-details-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="song-header">
        <img src={song.media.cover_image_url} alt={song.title} className="song-cover" />
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

export default RecentDetails;
