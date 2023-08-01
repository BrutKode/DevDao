import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typewriter from "typewriter-effect";
import { Outlet, Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="navbar fixed-top bg-success">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">Developer Dao</a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/signup">Sign In</a>
                </li>
              </ul>
            </div>
            <ConnectButton />
          </div>
        </nav>
    );
};

//UNCLASSIFIED

// <Typewriter
//options={{
//    strings: ["Developer", "DAO"],
//    autoStart: true,
//    loop: true,
//}}
//    />
