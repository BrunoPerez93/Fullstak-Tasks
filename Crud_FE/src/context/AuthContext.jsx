import { registerRequest, loginRequest } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setError([]);
    } catch (error) {
      console.error(error);
      setError([
        error.response?.data?.message || "An error occurred during signup",
      ]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
        setError([]);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError([error.response.data.message]);
      } else if (error.response?.data && Array.isArray(error.response.data)) {
        setError(error.response.data);
      } else {
        setError(["An error occurred during login"]);
      }
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError([]);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
