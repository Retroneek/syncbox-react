import { useState } from 'react'
import { BrowserRouter, useNavigate ,Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import Navbar from './components/base-comp/navbar/navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App;