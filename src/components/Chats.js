import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "./Chat.css";

const Chats = () => {
  const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  //get profile image
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }
      //Fetch data for existing user
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        //Create new user
        .catch((error) => {
          setLoadingError(true);
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);
          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);
            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => {
                setLoading(false);
                setLoadingError(false);
              })
              .catch((error) => {
                setLoadingError(true);
                console.log(error);
              });
          });
        });
    }
    return () => {
      didMountRef.current = false;
    };
  }, [user, history]);

  if (loadingError)
    return (
      <>
        <img
          src="https://chat-engine-assets.s3.amazonaws.com/temp-logo-min.png"
          className="logo"
          width="192"
        />
        <h1 className="mainMessage">
          Unfortunately, my basic plan for Chat Engine has expired.
        </h1>
        <p className="secondaryMessage">
          You can view the source code for this project on{" "}
          <a href="https://github.com/Aelbish/Chat" className="url">
            GitHub
          </a>{" "}
          or see other projects{" "}
          <a href="https://aelbish.com/" className="url">
            here
          </a>
          .
        </p>
      </>
    );

  if (!user || loading) return "Loading ... ";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        offset={-5}
      />
    </div>
  );
};

export default Chats;
