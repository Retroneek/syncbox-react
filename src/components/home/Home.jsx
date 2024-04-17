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
      <h1 className="title"> Projects </h1>
      <div className="home_control">
        <div id="syncDrive" onClick={() => navigate("/drive")}>
          <h2>Your Storage</h2>
          <img src={drive} />
          <p>Unlimited Storage <br/> from our friends at Discord</p>
        </div>
        <div id="syncChat" onClick={() => navigate("/chat")}>
          <h2>Chatroom</h2>
          <img src={chat} />
          <p>Talk with your buddies <br/> without the teachers watching you</p>
        </div>
        <div id="fileTransfer" onClick={() => navigate("/fileTransfer")}>
          <h2>File Transfer</h2>
          <img src={account} />
          <p>Exchange documents <br/> between two clients directly</p>
        </div>
        <div id="syncAccount" onClick={() => navigate("/account")}>
          <h2>Account</h2>
          <img src={settings} />
          <p>Modify account like <br/> settings, passwords, email and stuff</p>
        </div>

      </div>
    </>
  );
}

export default Home;
