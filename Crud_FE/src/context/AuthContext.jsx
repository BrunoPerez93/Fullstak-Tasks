import { registerRequest } from "@/api/auth";
import { createContext, useContext, useState } from "react";

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
      setError(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
