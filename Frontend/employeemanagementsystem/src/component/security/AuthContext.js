import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { executeJwtAuthenticationService } from "../../api/AuthenticationServiceApi";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export default function AuthProvider({ children }) {
  const navigate = useNavigate();


  // const secretKey = "KgTmlUOJBikBXKpfVpJfVFEqgUeOVnmL";
  // const encryptPassword = (password) => CryptoJS.AES.encrypt(password, secretKey).toString();


  const secretKey = CryptoJS.enc.Utf8.parse("KgTmlUOJBikBXKpfVpJfVFEqgUeOVnmL"); 


  const encryptPassword = (password) => {
    const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); // Ensure it's Base64 encoded
  };


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

  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem("userId") || null;
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

  useEffect(() => {
    sessionStorage.setItem("userId", userId);
  }, [userId]);

  // Login function
  async function login(userEmail, password) {
    try {
      const encryptedPassword = encryptPassword(password);
      const response = await executeJwtAuthenticationService({ email: userEmail, password:encryptedPassword });


      // if(response.data.message="User is disabled"){
      //   console.log('profile is inactive')
      // }
      

      if (response.status === 200) {
        const jwtToken = response.data.token;

        // Update individual states
        setIsAuthenticated(true);
        setUserEmail(userEmail);
        setToken(jwtToken);
        setRole(response.data.role);
        setUserId(response.data.userId)

        Cookies.set("token", jwtToken, {
          expires: 1,   // Expires in 1 day
          //secure: true, // Ensures it is sent only over HTTPS
          sameSite: "Strict"
      });


        // Store token in session storage
        //sessionStorage.setItem("token", jwtToken);
        navigate(0);  // Refreshes only the current route

        return true;
            }
    } catch (error) {
      const message=error.response.data.message
      if(message==="User is disabled"){
        return 403
      }
     
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
    setUserId(null);

    Cookies.remove("token");

    // Remove items from session storage
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");

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
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}