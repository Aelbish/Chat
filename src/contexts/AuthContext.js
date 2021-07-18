//React user context to manage our user information

import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    //grabbing the user from Firebase
    auth.onAuthStateChanged((user) => {
      //set the user and then redirect to /chats
      setUser(user);
      setLoading(false);
      //If we have a user than route to /chats
      history.push("/chats");
    });
  }, [user, history]);

  //React requires an object defined for a context
  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
