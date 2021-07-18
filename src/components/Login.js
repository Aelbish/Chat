import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat!</h2>
        <p>
          Start chatting with your friends, family, and colleagues using Chat.
        </p>
        <div
          className="login-button google"
          onClick={() => {
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          }}
        >
          <GoogleOutlined />&nbsp;&nbsp;Sign In
        </div>
        {/* <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() => {
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
          }}
        >
          <FacebookOutlined />&nbsp;&nbsp;Sign In
        </div> */}
      </div>
    </div>
  );
};

export default Login;
