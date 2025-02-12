import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { executeJwtAuthenticationService } from "../../api/AuthenticationServiceApi";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Separate states for user authentication and details
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") === "true";
  });

  const [userEmail, setUserEmail] = useState(() => {
    return sessionStorage.getItem("userEmail") || null;
  });

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });

  const [role, setRole] = useState(() => {
    return sessionStorage.getItem("role") || null;
  });

  // Update session storage whenever state changes
  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    sessionStorage.setItem("userEmail", userEmail);
  }, [userEmail]);

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem("role", role);
  }, [role]);

  // Login function
  async function login(userEmail, password) {
    try {
      const response = await executeJwtAuthenticationService({ email: userEmail, password });

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        // Update individual states
        setIsAuthenticated(true);
        setUserEmail(userEmail);
        setToken(jwtToken);
        setRole(response.data.role);

        // Store token in session storage
        sessionStorage.setItem("token", jwtToken);

        return true;
            }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  // Logout function
  function logout() {
    console.log("Logout successful");

    // Reset individual states
    setIsAuthenticated(false);
    setUserEmail(null);
    setToken(null);
    setRole(null);

    // Remove items from session storage
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");

    navigate("/");
  }

  // Provide authState and functions to children
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        token,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}