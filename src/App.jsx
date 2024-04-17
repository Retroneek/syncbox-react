import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Chat from "./components/chat/Chat.jsx";
import Account from "./components/account/Account.jsx";
import Drive from "./components/drive/Drive.jsx";
import FileTransfer from "./components/fileTransfer/fileTransfer.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Account />} />
        <Route path="/drive" element={<Drive />} />
        <Route path="/fileTransfer" element={<FileTransfer />} />
      </Routes>
    </>
  );
}

export default App;
