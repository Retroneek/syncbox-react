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
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
