import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import awsConfig from "../../aws-config";
import { jwtDecode } from "jwt-decode";
// Create a context for authentication
export const AuthContext = createContext();

// AuthContext provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

      // If the token has expired, return true
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  const checkSession = () => {
    let lastAuthUserSessionStorage = sessionStorage.getItem(
      "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        ".LastAuthUser"
    );

    let lastAuthUserlocalStorage = localStorage.getItem(
      "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        ".LastAuthUser"
    );
    let accessToken = "";
    if (lastAuthUserlocalStorage)
      accessToken = localStorage.getItem(
        "CognitoIdentityServiceProvider." +
          awsConfig.aws_user_pools_web_client_id +
          "." +
          lastAuthUserlocalStorage +
          ".accessToken"
      );
    if (lastAuthUserSessionStorage)
      accessToken = sessionStorage.getItem(
        "CognitoIdentityServiceProvider." +
          awsConfig.aws_user_pools_web_client_id +
          "." +
          lastAuthUserSessionStorage +
          ".accessToken"
      );

    return accessToken;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (user) {
      if (user["cognito:groups"].includes("Administrator")) setIsAdmin(true);
      else setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    checkAuthentication();
    const intervalId = setInterval(() => {
      checkAuthentication();
    }, 10 * 60 * 1000); // Every 10 minutes

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, [loading, isAuthenticated, navigate]);

  const checkAuthentication = () => {
    if (checkSession()) {
      if (!isTokenExpired(checkSession())) {
        setIsAuthenticated(true);
        console.log(jwtDecode(checkSession()));
        setUser(jwtDecode(checkSession()));
        navigate("/main");
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
