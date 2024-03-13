import React from "react";
import "./assets/navbar.css";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="logo" />
        <h1>SyncBox</h1>
      </div>
      <div className="navbar_menu">
        <button className="menu_home" onClick={() => navigate("/")}>
          <h1>Home</h1>
        </button>
        <button className="menu_contact" onClick={() => navigate("/contact")}>
          <h1>Contact</h1>
        </button>
        <button className="menu_about" onClick={() => navigate("/about")}>
          <h1>About</h1>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
