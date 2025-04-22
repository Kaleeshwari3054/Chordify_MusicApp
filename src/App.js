import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllArtist from "./components/ArtistPage";
import RecentDetails from "./Routing/RecentDetails";
import ArtistDetails from "./components/ArtistDetails";
import ProfilePage from "./components/ProfilePage";
import ProfileLibrary from "./components/ArtistPage";
import MusicDirectorDetails from "./MusicDirectorDetails";
import TamilSongs from "./Routing/TamilSongs";
import HindiSongs from "./Routing/HindiSongs";
import EnglishSongs from "./Routing/EnglishSongs";
import Signup from "./Signup";
import Login from "./Login";

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/artist-details/:artistName" element={<ArtistDetails />} />
      {/* <Route path="/profile/library" element={<ProfileLibrary />} /> */}
      <Route path="/profile" element={<ProfileLibrary />} />

      <Route path="/music-director/:name" element={<MusicDirectorDetails />} />
      <Route path="/musicdirector/:id" element={<MusicDirectorDetails />} />
      <Route path="/recent-details" element={<RecentDetails />} />
      <Route path="/all-artists" element={<AllArtist />} />
      <Route path="/tamilsongs" element={<TamilSongs />} />
      <Route path="/englishsongs" element={<EnglishSongs />} />
      <Route path="/hindhisongs" element={<HindiSongs />} />
    </Routes>
  </Router>
  );
};

export default App;





// import React from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const validationSchema = yup.object({
//   name: yup.string().required("Name is required"),
//   age: yup
//     .number()
//     .typeError("Age must be a number")
//     .positive("Age must be positive")
//     .integer("Age must be an integer")
//     .required("Age is required"),
// });

// function App() {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       age: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit:(values) => {
//       console.log(values);
//     },
//   });
//   // Store
// localStorage.setItem("username", "Kaleeshwari");
// <div>Hiiii</div>
// // Get
// const user = localStorage.getItem("username");
// console.log(user); // Output: Kaleeshwari

// // Remove
// localStorage.removeItem("username");

//   return (

    
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      
//       <h2>Yup Validation Form</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
          
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             onChange={formik.handleChange}
//             value={formik.values.name}
//           />
//           {formik.errors.name && (
//             <div style={{ color: "red" }}>{formik.errors.name}</div>
//           )}
//         </div>

//         <div>
//           <label>Age:</label>
//           <input
//             type="text"
//             name="age"
//             onChange={formik.handleChange}
//             value={formik.values.age}
//           />
//           {formik.errors.age && (
//             <div style={{ color: "red" }}>{formik.errors.age}</div>
//           )}
//         </div>

//         <button type="submit">Submit</button>
        
//       </form>
      
//     </div>
    
//   );
// }
// export default App;
