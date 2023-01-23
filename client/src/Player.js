import React from "react";
import'./Player.css'
import Sidebar from "./Sidebar";

import Footer from "./Footer";

function Player() {
  return(
    <div className="player">
    <div className="player__body">
    <Sidebar />

    </div>
    <Footer />
  </div>
)}

export default Player;
