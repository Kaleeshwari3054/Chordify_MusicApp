import React, { useState } from "react";

const MusicApp = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(songs[0]); // Initially set the first song
  const [suggestedSongs, setSuggestedSongs] = useState([]);

  const handleSongClick = (song) => {
    setCurrentSong(song);

    // Filter songs based on music director
    const suggestions = songs.filter(
      (item) =>
        item.musicDirector === song.musicDirector && item.id !== song.id
    );
    setSuggestedSongs(suggestions);
  };

  return (
    <div className="p-4">
      {/* Current Song Section */}
      <div className="mb-4 border-b pb-4">
        <h2 className="text-lg font-bold mb-2">Now Playing</h2>
        <div className="flex items-center">
          <img
            src={currentSong.songimage}
            alt={currentSong.songTitle}
            className="w-16 h-16 rounded"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold">{currentSong.songTitle}</h3>
            <p className="text-sm text-gray-600">{currentSong.musicDirector}</p>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div>
        <h2 className="text-lg font-bold mb-2">Suggestions</h2>
        {suggestedSongs.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {suggestedSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center cursor-pointer border p-2 rounded"
                onClick={() => handleSongClick(song)}
              >
                <img
                  src={song.songimage}
                  alt={song.songTitle}
                  className="w-12 h-12 rounded"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-medium">{song.songTitle}</h4>
                  <p className="text-xs text-gray-500">
                    {song.musicDirector}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default MusicApp;
