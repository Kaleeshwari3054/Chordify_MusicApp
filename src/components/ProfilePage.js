import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfileLibrary() {
  const { currentUser, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("User Profile");
  const [savedLibrary, setSavedLibrary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrary = async () => {
      if (currentUser) {
        try {
          const libraryRef = collection(
            db,
            "users",
            currentUser.uid,
            "library"
          );
          const q = query(libraryRef);
          const querySnapshot = await getDocs(q);
          const songs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSavedLibrary(songs);
        } catch (error) {
          console.error("Error fetching library:", error);
        }
      }
    };

    fetchLibrary();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-box">
          <h2>Profile & Library</h2>
          <p>
            Please <Link to="/login">log in</Link> to see your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <h2>Profile & Library</h2>
          <div className="category-tabs">
            <button
              className={selectedCategory === "User Profile" ? "active" : ""}
              onClick={() => setSelectedCategory("User Profile")}
            >
              User Profile
            </button>
            <button
              className={selectedCategory === "Library" ? "active" : ""}
              onClick={() => setSelectedCategory("Library")}
            >
              Library
            </button>
          </div>
        </div>

        <div className="profile-content">
          {selectedCategory === "User Profile" && (
            <div className="user-info">
              <h3>User Profile</h3>
              <div className="profile-avatar">
                <img
                  src={
                    currentUser?.photoURL
                      ? currentUser.photoURL
                      : "https://w0.peakpx.com/wallpaper/119/566/HD-wallpaper-ek-dhanush-ke-art-work-dhanush-indian-actor.jpg"
                  }
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="user-name">
                <strong>Username:</strong>{" "}
                {currentUser.displayName || "Unknown"}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <button className="logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}

          {selectedCategory === "Library" && (
            <div className="library-list">
              <h3>Your Library</h3>
              {savedLibrary.length > 0 ? (
                <ul>
                  {savedLibrary.map((song) => (
                    <li key={song.id} className="library-item">
                      <p>
                        <strong>Song:</strong> {song.songTitle}
                      </p>
                      <p>
                        <strong>Artist:</strong> {song.artist}
                      </p>
                      <Link to={`/recent-details/${song.id}`}>
                        View Details
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your library is empty. Add songs to your library!</p>
              )}
            </div>
          )}
        </div>

        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
