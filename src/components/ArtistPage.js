import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import "../styles.css"
import musicData from "./MusicData.json"; // Import your JSON data

const ArtistPage = () => {
  const popularArtists = musicData.filter((music) => music.image);
  const navigate = useNavigate(); // Hook for navigation


  return (
    <div className="artist-page">
      <header className="artist-header">
        {/* Go Back Button */}
      <button className="go-back-btn" onClick={() => navigate("/")}>
        {/* Home Icon */}
        <AiOutlineHome size={20} style={{ marginRight: "5px" }} />
        Go Back
      </button>
        <h1 className="artist-title">Popular Artists</h1>
      </header>

      <section className="artist-content">
        {popularArtists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <div className="artist-image-container">
              <img
                src={artist.image}
                alt={artist.artist}
                className="artist-image"
              />
              <div className="artist-play-icon">
                <i className="fas fa-play"></i>
              </div>
            </div>
            <p className="artist-name">{artist.artist}</p>
            <p className="artist-movie">{artist.movie}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ArtistPage;
