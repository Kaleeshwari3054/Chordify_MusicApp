// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { motion } from "framer-motion";
// import "./Auth.css";

// const firebaseConfig = {
//   apiKey: "AIzaSyDM93120Ba-eBBO2sYTWI9htHCOrgkPgN8",
//   authDomain: "chordify-2e659.firebaseapp.com",
//   projectId: "chordify-2e659",
//   storageBucket: "chordify-2e659.appspot.com",
//   messagingSenderId: "271734174990",
//   appId: "1:271734174990:web:3733790be87253e33dd35f",
//   measurementId: "G-Z9KG64HFL5",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await updateProfile(user, { displayName: username });

//       await addDoc(collection(db, "users"), {
//         username: username,
//         email: email,
//         uid: user.uid,
//         registrationTime: new Date().toISOString(),
//       });

//       alert("Registration successful!");
//       navigate("/"); // Redirect to login page
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && <p className="error">{error}</p>}
//           <motion.button whileHover={{ scale: 1.1 }} type="submit">
//             Sign Up
//           </motion.button>
//         </form>
//         <p>
//           Already have an account? <a href="/login">Log in here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";

const firebaseConfig = {
  apiKey: "AIzaSyDM93120Ba-eBBO2sYTWI9htHCOrgkPgN8",
  authDomain: "chordify-2e659.firebaseapp.com",
  projectId: "chordify-2e659",
  storageBucket: "chordify-2e659.appspot.com",
  messagingSenderId: "271734174990",
  appId: "1:271734174990:web:3733790be87253e33dd35f",
  measurementId: "G-Z9KG64HFL5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Name is required")
    .min(3, "Name must be minimum three letter above"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\S/, "Password should not contain only spaces")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    const { username, email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
        photoURL: "https://w0.peakpx.com/wallpaper/119/566/HD-wallpaper-ek-dhanush-ke-art-work-dhanush-indian-actor.jpg", // ✅ default profile image
      });

      await addDoc(collection(db, "users"), {
        username,
        email,
        uid: user.uid,
        registrationTime: new Date().toISOString(),
      });

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      await addDoc(collection(db, "users"), {
        username: user.displayName || "No Name",
        email: user.email,
        uid: user.uid,
        registrationTime: new Date().toISOString(),
      });
  
      alert("Signup with Google successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Signup Error:", error); // 👈 This will help
      alert("Google signup failed. Try again.");
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field type="text" name="username" placeholder="Enter your name" />
              <ErrorMessage name="username" component="p" className="error" />

              <Field type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="p" className="error" />

              <Field type="password" name="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="p" className="error" />

              {errors.submit && <p className="error">{errors.submit}</p>}

              <motion.button whileHover={{ scale: 1.1 }} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </motion.button>
            </Form>
          )}
        </Formik>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="google-login-btn"
          onClick={handleGoogleSignup}
          type="button"
        >
          Continue with Google
        </motion.button>

        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

