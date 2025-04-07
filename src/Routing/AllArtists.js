import React from "react";
import MusicData from "../components/MusicData.json";
import "../styles.css";

const AllArtists = () => {
  return (
    <div className="spotify-ui">
      <header className="header">
        <div className="profile-icon">K</div>
        <div className="section-title">All Artists</div>
      </header>
      <section className="main-content">
        <div className="recently-played">
          {MusicData.map((music) => (
            <div key={music.id} className="song-card">
              {music.image && (
                <img
                  src={music.image}
                  alt={music.movie}
                  className="movie-image"
                />
              )}
              <p className="song-title">{music.songTitle}</p>
              <p className="music-details">
                <strong>Music Director:</strong> {music.musicDirector} <br />
                <strong>Actor:</strong> {music.actor} <br />
                <strong>Movie:</strong> {music.movie}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllArtists;
