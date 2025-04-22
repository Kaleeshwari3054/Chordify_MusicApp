import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import musicData from "./MusicData.json";
import "../styles.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { currentUser } = useAuth();

  const allSongs = Object.values(musicData).flat();

  useEffect(() => {
    document.title = "Chordify 🎵 - Your Personalized Music Vibes";
    const descriptionTag = document.querySelector("meta[name='description']");
    if (descriptionTag) {
      descriptionTag.setAttribute(
        "content",
        "Discover music, explore top artists and enjoy recently played songs at Chordify."
      );
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allSongs.filter(
        (item) =>
          item.songTitle?.toLowerCase().includes(query) ||
          item.artist?.toLowerCase().includes(query)
      );
      setFilteredResults(results);
    }
  };

  // 🎧 Recently Played (limited to 5 search results or fallback)
  const recentlyPlayed = searchQuery
    ? filteredResults.slice(0, 5)
    : allSongs.slice(0, 5);

  // 🧑‍🎤 Show all artists with images
  const allArtists = allSongs.filter((music) => music.image);

  return (
    <div>
      <header className="header">
        {currentUser ? (
          <Link to="/profile" className="profile-icon">
            {currentUser.displayName
              ? currentUser.displayName.charAt(0).toUpperCase()
              : "U"}
          </Link>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

        {/* 🔍 Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </header>

      <section className="main-content">
        {/* 🔥 Recently Played */}
        <h2 className="section-title">Recently Played</h2>
        <div className="recently-played">
          {recentlyPlayed.map((music) => (
            <Link
              key={music.id}
              to="/recent-details"
              state={{ music }}
              className="song-card"
            >
              <div className="image-container">
                <img
                  src={music.songimage}
                  alt={music.songTitle}
                  className="song-image"
                />
                <div className="play-icon">
                  <i className="fas fa-play"></i>
                </div>
              </div>
              <p className="song-title">{music.songTitle}</p>
              <p className="music-details">
                <strong>Music Director:</strong> {music.musicDirector} <br />
                <strong>Actor:</strong> {music.actor || "N/A"} <br />
                <strong>Movie:</strong> {music.movie}
              </p>
            </Link>
          ))}
        </div>

        {/* 🧑‍🎤 All Artists */}
        <h2 className="section-title">All Artists</h2>
        <div className="recently-played1">
          {allArtists.map((artist) => (
            <Link
              key={artist.id}
              to={`/musicdirector/${artist.id}`}
              state={{ musicDirectorName: artist.musicDirector }}
              className="artist-card"
            >
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
              <p className="artist-name">{artist.musicDirector}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;