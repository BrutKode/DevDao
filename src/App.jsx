import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//WEB3
import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";


//Components
import { NavBar } from "./components/NavBar/main.jsx";
import { Home } from "./components/Home/Home.jsx";


function App() {

    const { chains, publicClient } = configureChains(
        [mainnet, polygon, optimism, arbitrum, zora],
        [
            publicProvider()
        ]
    );

    const { connectors } = getDefaultWallets({
        appName: "My RainbowKit App",
        projectId: "YOUR_PROJECT_ID",
        chains
    });

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
    });

    return (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
            <NavBar />
            <Home />
          </RainbowKitProvider>
        </WagmiConfig>

    );
}

export default App;
