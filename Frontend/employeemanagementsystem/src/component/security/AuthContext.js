import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginApi } from "../../api/EmployeeApiService";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Combined state for user authentication and details
  const [authState, setAuthState] = useState(() => {
    const storedAuth = sessionStorage.getItem("authState");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, userEmail: null, token: null, role: null };
  });

  // Update local storage whenever authState changes
  useEffect(() => {
    sessionStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  // Login function
  async function login(userEmail, password) {
    try {
      const response = await userLoginApi(userEmail, password);

      if (response.status === 200) {
        // Update authState with new user details
        setAuthState({
          isAuthenticated: true,
          userEmail,
          token: response.data.token, // Assuming the API returns a token
          role: response.data, // Assuming the API returns a role
        });

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
    setAuthState({
      isAuthenticated: false,
      userEmail: null,
      token: null,
      role: null,
    });
    navigate("/");
  }

  // Provide authState and functions to children
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userEmail: authState.userEmail,
        token: authState.token,
        role: authState.role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}