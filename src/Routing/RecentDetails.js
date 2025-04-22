import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import songData from "../components/Recent/RecentDetail.json";
import musicDirectorsData from "../components/musicDirectors.json";
import { addToPlaylist } from "../AddToPlaylist"; // adjust path
import { auth } from "../firebase";
import "./RecentDetails.css";

const RecentDetails = () => {
  const location = useLocation();
  const songId = location.state?.songId;

  const song = songData.find((item) => item.id === songId);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(() => {
    const savedLikes = localStorage.getItem("likedSongs");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  const handleAddToLibrary = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Login required!");
      return;
    }
    console.log(handleAddToLibrary);

    await addToPlaylist(user.uid, "liked", song); // "liked" or "watchLater"
  };

  const audioRefs = useRef([]);
  const currentlyPlayingRef = useRef(null);

  const [director, setDirector] = useState(null);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    if (song) {
      const foundDirector = musicDirectorsData.find((item) =>
        song.artists.music_directors.includes(item.name)
      );
      setDirector(foundDirector);
    }
  }, [song]);

  const toggleLike = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const handlePlay = (index) => {
    const audio = audioRefs.current[index];

    if (currentlyPlayingRef.current && currentlyPlayingRef.current !== audio) {
      currentlyPlayingRef.current.pause();
    }

    if (currentlyPlayingRef.current === audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      currentlyPlayingRef.current = audio;
      audio.play();
      setIsPlaying(true);
    }

    setPlayingIndex(index);
  };

  const addToLibrary = (song) => {
    const saved = localStorage.getItem("savedLibrary");
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [...existing, song];
    localStorage.setItem("savedLibrary", JSON.stringify(updated));
    alert("Song saved to library!");
  };

  if (!song) return <div>Song not found</div>;

  return (
    <div className="recent-details-container">
      <h2 className="Tittlee">{song.title}</h2>
      <img src={song.media.cover_image_url} alt={song.title} />

      <div className="details-flex">
        <div className="left-section">
          <h3>Album & Movie Info</h3>
          <p>
            <strong>Album:</strong> {song.album.name} ({song.album.release_year}
            )
          </p>
          <p>
            <strong>Movie:</strong> {song.movie.title}
          </p>
          <p>
            <strong>Director:</strong> {song.movie.director}
          </p>
          <p>
            <strong>Producers:</strong> {song.movie.producers.join(", ")}
          </p>

          <h3>Artists</h3>
          <p>
            <strong>Singers:</strong> {song.artists.singers.join(", ")}
          </p>
          <p>
            <strong>Music Directors:</strong>{" "}
            {song.artists.music_directors.join(", ")}
          </p>
          <p>
            <strong>Lyricists:</strong> {song.artists.lyricists.join(", ")}
          </p>
        </div>

        <div className="right-section">
          <h3>Status</h3>
          <p>
            <strong>Language:</strong> {song.language}
          </p>
          <p>
            <strong>Duration:</strong> {song.duration} seconds
          </p>
          <p>
            <strong>Release Date:</strong> {song.release_date}
          </p>
          <p>
            <strong>Genre:</strong> {song.genre.join(", ")}
          </p>
          <p>
            <strong>Likes:</strong> {song.metadata.likes.toLocaleString()}
          </p>
          <p>
            <strong>Plays:</strong> {song.metadata.plays.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="btn-group">
        <button className="play-btn" onClick={() => handlePlay(0)}>
          {playingIndex === 0 && isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>

        <button className="like-btn" onClick={() => toggleLike(song.id)}>
          {likedSongs.includes(song.id) ? "💔 Unlike" : "❤️ Like"}
        </button>

        {/* <button className="save-button" onClick={() => addToLibrary(song)}>
          + Save to Library
        </button> */}

        <button onClick={handleAddToLibrary}>+ Save to Liked</button>
      </div>

      <div className="song-section">
        <audio
          ref={(el) => (audioRefs.current[0] = el)}
          controls
          src={song.media.audio_url}
        />
      </div>
    </div>
  );
};

export default RecentDetails;
