import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { NFT } from "../NFT/main.jsx";
import { MultiSig } from "../MultiSig/main.jsx";

import { NavBar } from "../NavBar/main.jsx";

import "./Home.css";

export const Home = () => {
    const { address } = useAccount();
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: "Welcome to developer dao captain, get ready to sail!",
    });

    return (
        <>
          <NavBar />
          <div style={{ margin: "100px" }}>
            <h1>Sign in now!</h1>
            <p>
              Sign in to the Dapp for a better experience browsing the website, use your wallet to control your account and mint NFTs!
            </p>
            <div className="index">
              <button className="cusButton" disabled={isLoading} onClick={() => signMessage()}>
                Sign message
              </button>
            </div>
            {isSuccess && <div>Signature: {data}</div>}
            {isError && <div>Error signing message</div>}
          </div>
        </>
    );
};
