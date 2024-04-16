import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post(
      `http://localhost:5000/api/v1/auth/login`,
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(response.data.user);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
};
