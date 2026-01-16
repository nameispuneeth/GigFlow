import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setAuthLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_BACKEND_URL}/api/getuserdet`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (data.status === "ok") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
