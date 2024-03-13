import React from 'react';
import './assets/home.css';
import chat from './assets/chat.png';
import drive from './assets/drive.png';

function Home(){
    return(
      <>
      <div className = 'home_control'>
        <div id="syncDrive">
          <h2>Drive</h2>
          <img src={drive}/>
        </div>
        <div id="syncChat">
          <h2>Chat</h2>
          <img src={chat}/>
        </div>
        <div id="syncSettings">
          <h2>Settings</h2>
          <img src={chat}/>
        </div>
        <div id="syncOthers">
          <h2>Other</h2>
          <img src={chat}/>
        </div>
      </div>
    </>
    )
  }

    export default Home;