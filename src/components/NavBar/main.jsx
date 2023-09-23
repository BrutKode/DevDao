import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typewriter from "typewriter-effect";

import ReactDOM from "react-dom/client";

export const NavBar = () => {
    return (
        <nav
          className="navbar navbar-expand-lg fixed-top"
          style={{
              background:
              "linear-gradient(45deg, rgba(150, 150, 255, 0.8), rgba(255, 150, 150, 0.8))",
              margin: "10px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50px"
          }}
        >
          <div className="container-fluid">
            <a className="navbar-brand text-white" style={{ width:"150px" }} href="/">
              { window.innerWidth > 700 ? ( <Typewriter
                                              options={{
                                                  strings: ["Developer", "DAO"],
                                                  autoStart: true,
                                                  loop: true,
                                              }}
                                            /> ) : (
                                                "Developer DAO"
                                            )
              }
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="text-white nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="text-white nav-link active" href="/collections">NFT</a>
                </li>
                <li className="nav-item">
                  <a className="text-white nav-link active" href="/signup">Auth</a>
                </li>
              </ul>
            </div>
            <ConnectButton />
          </div>
        </nav>
    );
};
