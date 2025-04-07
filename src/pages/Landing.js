// import React from "react";
// import { Link } from "react-router-dom";
// import musicData from "./MusicData.json"; // Import your JSON data

// const HomePage = () => {
//   // Filter data for Popular Artists
//   const popularArtists = musicData.filter((music) => music.image);

//   return (
//     <div>
//            <header className="header">
//         <div className="profile-icon">K</div>
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
//         {musicData.slice(0, 5).map((music) => (
//   <div key={music.id} className="song-card">
//     <div className="image-container">
//       <img
//         src={music.songimage}
//         alt={music.songTitle}
//         className="song-image"
//       />
//       <div className="play-icon">
//         <i className="fas fa-play"></i>
//       </div>
//     </div>
//     <p className="song-title">{music.songTitle}</p>
//     <p className="music-details">
//       <strong>Music Director:</strong> {music.musicDirector} <br />
//       <strong>Actor:</strong> {music.actor} <br />
//       <strong>Movie:</strong> {music.movie}
//     </p>
//   </div>
// ))}

//         </div>

//         {/* Popular Artists Section */}
//         <div className="section-title">
//           Popular Artists
//           <Link
//             to="/all-artists"
//             state={{ artists: popularArtists }}
//             className="show-all-btn"
//           >
//             Show All
//           </Link>
//         </div>
//         <div className="recently-played">
//           {popularArtists.slice(0, 5).map((artist) => (
//             <div key={artist.id} className="song-card">
//               <img
//                 src={artist.image}
//                 alt={artist.movie}
//                 className="movie-image"
//               />
//               <div className="play-icon">
//         <i className="fas fa-play"></i>
//       </div>
//               <p className="song-title">{artist.movie}</p>
//               <p className="song-title">{artist.artist}</p>

//             </div>
//           ))}
//         </div>
//       </section>
//       <footer className="footer">
//     <button className="footer-btn">Home</button>
//     <button className="footer-btn">Search</button>
//     <button className="footer-btn">Your Library</button>
//     <button className="footer-btn">Premium</button>
//   </footer>
//     </div>
//   );
// };

// export default HomePage;
// // bottom: 25px;
// // right: 40px;


{/* <div key={artist.id} className="artist-card">
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
</div> */}
