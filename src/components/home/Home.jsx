import React from "react";
import "./assets/home.css";
import chat from "./assets/chat.png";
import drive from "./assets/drive.png";
import account from "./assets/user.png";
import settings from "./assets/cog.png";
import Navbar from "../base-comp/navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <h1 className="title"> Home </h1>
      <div className="home_control">
        <div id="syncDrive">
          <h2>Drive</h2>
          <img src={drive} />
        </div>
        <div id="syncChat" onClick={() => navigate("/chat")}>
          <h2>Chat</h2>
          <img src={chat} />
        </div>
        <div id="syncSettings">
          <h2>Settings</h2>
          <img src={account} />
        </div>
        <div id="syncAccount" onClick={() => navigate("/account")}>
          <h2>Account</h2>
          <img src={settings} />
        </div>

      </div>
    </>
  );
}

export default Home;
