import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllArtist from "./components/ArtistPage";
import RecentDetails from "./Routing/RecentDetails";
import ArtistDetails from "./components/ArtistDetails";
import ProfilePage from "./components/ProfilePage";
import ProfileLibrary from "./components/ArtistPage";
import MusicDirectorDetails from "./MusicDirectorDetails";
import Signup from "./Signup";
import Login from "./Login";

{/* <Router>
  <Routes>
  </Routes>
</Router> */}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/artist-details/:artistName" element={<ArtistDetails />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="library" element={<ProfileLibrary />} />
        </Route>
        {/* <Route path="/music-director/:musicDirectorName" element={<MusicDirectorDetails />} /> */}
        <Route path="/music-director/:name" element={<MusicDirectorDetails />} />
        <Route path="/musicdirector/:id" element={<MusicDirectorDetails />} />

        <Route path="/recent-details" element={<RecentDetails />} />
        <Route path="/all-artists" element={<AllArtist />} />
      </Routes>
    </Router>
  );
};

export default App;
