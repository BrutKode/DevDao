import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typewriter from "typewriter-effect";

export const NavBar = () => {
  return (
    <nav className="navbar fixed-top bg-success">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          <Typewriter
            options={{
              strings: ["Developer", "DAO"],
              autoStart: true,
              loop: true,
            }}
          />
        </a>
        <ConnectButton />
      </div>
    </nav>
  );
};
