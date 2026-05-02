import { Routes, Route } from "react-router-dom";
import AsciiSmokeBackground from "./components/background/AsciiSmokeBackground.jsx";
import Home from "./components/home/Home.jsx";
import Portfolio from "./components/portfolio/Portfolio.jsx";
import ProjectDetail from "./components/portfolio/ProjectDetail.jsx";
import Header from "./components/ui/Header.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Chat from "./components/chat/Chat.jsx";
import Account from "./components/account/Account.jsx";
import Drive from "./components/drive/Drive.jsx";
import FileTransfer from "./components/fileTransfer/fileTransfer.jsx";

function App() {
  return (
    <>
      <AsciiSmokeBackground />
      <Header />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/account" element={<Account />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/fileTransfer" element={<FileTransfer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
