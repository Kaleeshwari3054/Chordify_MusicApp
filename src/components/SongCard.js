import React from "react";

// Component to display individual song details
const SongCard = ({ song }) => {
  return (
    <div className="song-card" style={styles.card}>
      <img
        src={song.media.cover_image_url}
        alt={song.title}
        style={styles.image}
      />
      <h3>{song.title}</h3>
      <p>{song.artists.singers.join(", ")}</p>
      <p>{song.album.name} ({song.album.release_year})</p>
      <audio controls>
        <source src={song.media.audio_url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <p>Likes: {song.metadata.likes}</p>
        <p>Plays: {song.metadata.plays}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    width: "200px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};

export default SongCard;
 