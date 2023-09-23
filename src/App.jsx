import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//WEB3
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  goerli,
  sepolia,
  avalancheFuji,
  fantomTestnet,
  localhost,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

//Components
import { NavBar } from "./components/NavBar/main.jsx";
import { Home } from "./components/Home/Home.jsx";
import { MultiSig } from "./components/MultiSig/main.jsx";
import { NFT } from "./components/NFT/main.jsx";

function App() {
  const { chains, publicClient } = configureChains(
    [goerli, sepolia, avalancheFuji, fantomTestnet, localhost],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: "MultiSIg",
    projectId: "df7e6d9ab167c24c2dc3f60e0e3afb3b",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

    let address = "";
    return (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" Component={MultiSig} />
                <Route path="/collections" Component={NFT} />
                <Route path="/signup" Component={Home} />
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
        
    );
}

export default App;
