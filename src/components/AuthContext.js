import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Ensure Firebase is set up correctly
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Ensure logout function is defined and exported
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Make sure `useAuth` provides `logout`
export function useAuth() {
  return useContext(AuthContext);
}
