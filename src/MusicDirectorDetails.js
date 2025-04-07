// import React from "react";
// import { useParams } from "react-router-dom";
// import musicData from "./components/MusicData.json";
// import "./Routing/Routing.css";

// const MusicDirectorDetails = () => {
//   const { musicDirectorName } = useParams();
//   const decodedName = decodeURIComponent(musicDirectorName);
//   const allSongs = Object.values(musicData).flat();

//   const directorSongs = allSongs.filter(
//     (song) => song.musicDirector === decodedName
//   );

//   const headerImage =
//     "https://wallpapers.com/images/featured/yuvan-shankar-raja-op9rxxeu7i4z38jz.jpg";

// //   Use any one song to get music director image
//   const musicDirectorImage =
//     directorSongs[0]?.musicDirectorImage || "default-director.jpg";

//   return (
//     <div className="music-director-page">
//     <div
//       className="music-director-header"
//       style={{
//         backgroundImage: `url(${headerImage})`,
//       }}
//     >
//       <div className="header-content-flex">
//         {/* Left Side - Music Director Image */}
//         <div className="director-img-box">
//           {/* Optional: Uncomment if you want to show the director image */}
//           {/* <img
//             src={headerImage}
//             alt={decodedName}
//             className="director-img"
//           /> */}
//         </div>
  
//         {/* Right Side - Text Content */}
//         <div className="director-info">
//           <p className="verified">✔ Verified Director</p>
//           <h1 className="director-name">{decodedName}</h1>
//           <p className="listeners">35,000,000 monthly listeners</p>
//           <div className="button-group">
//             <button className="play-btn">▶▶▶Play</button>
//             <button className="follow-btn">Follow</button>
//           </div>
//         </div>
//       </div>
//     </div>


//       {/* Song List */}
//       <div className="song-list">
//         <h2>Popular</h2>
//         {directorSongs.map((song, index) => (
//           <div key={song.id} className="song-row">
//             <div className="left">
//               <span>{index + 1}</span>
//               <img
//                 src={song.songimage}
//                 alt={song.songTitle}
//                 className="song-img"
//               />
//             </div>
//             <div className="center">
//               <p className="song-title">{song.songTitle}</p>
//               <p className="movie-name">{song.movie}</p>
//             </div>
//             <div className="right">
//               <p className="duration">{song.duration || "3:30"}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MusicDirectorDetails;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import musicDirectorsData from "./components/musicDirectors.json";
import "./Routing/musicDirector.css"

const MusicDirectorDetails = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);

  useEffect(() => {
    const foundDirector = musicDirectorsData.find(
      (item) => item.id === parseInt(id)
    );
    setDirector(foundDirector);
  }, [id]);

  if (!director) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
    <div className="director-profile">
      <img src={director.image} alt={director.name} className="director-img" />
      <h2 className="director-name">{director.name}</h2>
    </div>

    <h3 className="section-title">Songs</h3>
    <div className="track-list">
      {director.songs.map((song) => (
        <div key={song.id} className="track-card">
          <img src={song.image} alt={song.title} className="track-img" />
          <div className="track-info">
            <p><strong>{song.title}</strong> - {song.movie}</p>
            <p>Duration: {song.duration}</p>
            <audio controls src={song.songUrl} />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MusicDirectorDetails;
