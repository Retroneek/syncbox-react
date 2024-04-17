import React from "react";
import "./assets/contact.css";
import Navbar from "../base-comp/navbar/navbar.jsx";
import LinkedIn from "./assets/linkedin.png";
import Github from "./assets/github.png";
import Discord from "./assets/discord.png";
import Stack from "./assets/stack.png";

function Contact() {
  return (
    <>
      <Navbar />
      <h1 className="title"> Contact </h1>
      <>
        <div className="contactCard">
          <img
            src="https://avatars.githubusercontent.com/u/116238853?v=4"
            alt="Evan Sanchez"
          />
          <h2>Evan Sanchez</h2>
          <div className="accessLinks">
            <div
              id="github"
              onClick={() =>
                (window.location = "https://github.com/Retroneek/")
              }
            >
              <img src={Github}></img>
            </div>
            <div
              id="linkedin"
              onClick={() => (window.location = "https://Linkedin.com/")}
            >
              <img src={LinkedIn}></img>
            </div>
            <div
              id="discord"
              onClick={() => (window.location = "https://discord.com/")}
            >
              <img src={Discord}></img>
            </div>
            <div
              id="stack"
              onClick={() => (window.location = "https://stackoverflow.com/")}
            >
              <img src={Stack}></img>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Contact;
