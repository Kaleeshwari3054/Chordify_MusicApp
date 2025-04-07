// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Import AuthContext hook
// import musicData from "./MusicData.json";
// import "../styles.css";

// const HomePage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredResults, setFilteredResults] = useState([]);
//   const { currentUser } = useAuth(); // Get the logged-in user data

//     // Flatten the JSON object into a single array
//     const allSongs = Object.values(musicData).flat();

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query.trim() === "") {
//       setFilteredResults([]);
//     } else {
//       const results = allSongs.filter(
//         (item) =>
//           item.songTitle?.toLowerCase().includes(query) ||
//           item.artist?.toLowerCase().includes(query) ||
//           item.movie?.toLowerCase().includes(query)
//       );
//       setFilteredResults(results);
//     }
//   };

//   const recentlyPlayed = searchQuery
//     ? filteredResults.slice(0, 5)
//     : allSongs.slice(0, 5);

//   const popularArtists = searchQuery
//     ? filteredResults.filter((music) => music.image).slice(0, 5)
//     : allSongs.filter((music) => music.image).slice(0, 5);

//   return (
//     <div>
//       <header className="header">
//         {currentUser ? (
//           <Link to="Profile" className="profile-icon">
//             {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
//           </Link>
//         ) : (
//           <Link to="/login">
//             <button className="login-btn">Login</button>
//           </Link>
//         )}

//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search songs, artists, movies..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="search-input"
//           />
//           <i className="fas fa-search search-icon"></i>
//         </div>

//         <div className="header-options">
//           <button className="all-btn">All</button>
//           <button className="music-btn">Music</button>
//           <button className="podcasts-btn">Podcasts</button>
//         </div>
//       </header>

//       {/* Recently Played Section */}
//       <section className="main-content">
//         <div className="section-title">Recently Played</div>
//         <div className="recently-played">
//           {recentlyPlayed.map((music) => (
//             <Link
//               key={music.id}
//               to="/recent-details"
//               state={{ music }}
//               className="song-card"
//             >
//               <div className="image-container">
//                 <img
//                   src={music.songimage}
//                   alt={music.songTitle}
//                   className="song-image"
//                 />
//                 <div className="play-icon">
//                   <i className="fas fa-play"></i>
//                 </div>
//               </div>
//               <p className="song-title">{music.songTitle}</p>
//               <p className="music-details">
//                 <strong>Music Director:</strong> {music.musicDirector} <br />
//                 <strong>Actor:</strong> {music.actor} <br />
//                 <strong>Movie:</strong> {music.movie}
//               </p>
//             </Link>
//           ))}
//         </div>

//         {/* Popular Artists Section */}
// <div className="section-title">
//   Popular Artists
//   <Link
//     to="/all-artists"
//     state={{ artists: popularArtists }}
//     className="show-all-btn"
//   >
//     Show All
//   </Link>
// </div>
// <div className="recently-played">
//   {popularArtists.map((artist) => (
//     <Link
//       key={artist.id}
//       to="/all-artists"
//       state={{ musicDirector: artist.musicDirector }} // Pass selected music director
//       className="artist-card"
//     >
//       <div className="artist-image-container">
//         <img
//           src={artist.image}
//           alt={artist.artist}
//           className="artist-image"
//         />
//         <div className="artist-play-icon">
//           <i className="fas fa-play"></i>
//         </div>
//       </div>
//       <p className="artist-name">{artist.artist}</p>
//       <p className="artist-movie">{artist.musicDirector}</p>
//     </Link>
//   ))}
// </div>


// <div className="section-title">
//   Popular Artists
//   <Link to="/all-artists" className="show-all-btn">Show All</Link>
// </div>
// <div className="recently-played">
//   {popularArtists.map((artist) => (
//     <Link
//       key={artist.id}
//       to={`/artist-details/${encodeURIComponent(artist.artist)}`} // Pass artist name in URL
//       className="artist-card"
//     >
//       <div className="artist-image-container">
//         <img
//           src={artist.image}
//           alt={artist.artist}
//           className="artist-image"
//         />
//         <div className="artist-play-icon">
//           <i className="fas fa-play"></i>
//         </div>
//       </div>
//       <p className="artist-name">{artist.artist}</p>
//     </Link>
//   ))}
// </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <button className="footer-btn">Home</button>
//         <button className="footer-btn">Search</button>
//         <button className="footer-btn">Your Library</button>
//         <button className="footer-btn">Premium</button>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import AuthContext hook
import musicData from "./MusicData.json";
import "../styles.css";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { currentUser } = useAuth(); // Get the logged-in user data

  // Flatten all songs from JSON into one array
  const allSongs = Object.values(musicData).flat();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allSongs.filter(
        (item) =>
          item.songTitle?.toLowerCase().includes(query) ||
          item.artist?.toLowerCase().includes(query) ||
          item.movie?.toLowerCase().includes(query)
      );
      setFilteredResults(results);
    }
  };

  const recentlyPlayed = searchQuery
    ? filteredResults.slice(0, 5)
    : allSongs.slice(0, 5);

  const popularArtists = searchQuery
    ? filteredResults.filter((music) => music.image).slice(0, 5)
    : allSongs.filter((music) => music.image).slice(0, 5);

  return (
    <div>
      {/* Header */}
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

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs, artists, movies..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </header>

      {/* Main Content */}
      <section className="main-content">
        {/* Recently Played */}
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
                <strong>Actor:</strong> {music.actor} <br />
                <strong>Movie:</strong> {music.movie}
              </p>
            </Link>
          ))}
        </div>

        {/* Popular Artists Section */}
        <div className="section-title-container">
          <h2 className="section-title">Popular Artists</h2>
          <Link to="/all-artists" className="show-all-btn">
            Show All
          </Link>
        </div>

        <div className="recently-played1">
          {popularArtists.map((artist) => (
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

      {/* Footer */}
      <footer className="footer">
        <button className="footer-btn">Home</button>
        <button className="footer-btn">Search</button>
        <button className="footer-btn">Your Library</button>
        <button className="footer-btn">Premium</button>
      </footer>
    </div>
  );
};

export default HomePage;


