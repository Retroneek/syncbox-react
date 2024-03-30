import React from "react";
import './assets/contact.css';
import Navbar from '../base-comp/navbar/navbar.jsx';

function Contact() {
    return (
        <>
        <Navbar />
        <div className = 'contactCard'>
            <img src="https://avatars.githubusercontent.com/u/116238853?v=4" alt="Evan Sanchez-Alvarez" />
            <h2>Evan Sanchez-Alvarez</h2>
            <p>Discord: @retroneek</p>
            <p>Email: retroneekus@gmail.com</p>
            <p>Github: Retroneek</p>
        </div>
        </>
    )
    }

export default Contact;