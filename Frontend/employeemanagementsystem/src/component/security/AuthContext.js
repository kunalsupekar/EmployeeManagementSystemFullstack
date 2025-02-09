import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername ? storedUsername : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username"); // Clean up localStorage on logout
    }
  }, [username]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token"); // Clean up localStorage on logout
    }
  }, [token]);

  function login(username, password) {
    if (username === "kunal" && password === "123") {
      setUsername(username);
      setAuthenticated(true);
      //setToken("dummyToken");  // Set a token if you need one for your app
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    console.log("logout succesful");
    setUsername(null);
    setAuthenticated(false);
    setToken(null); // Also clear the token
    navigate(`/`);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
