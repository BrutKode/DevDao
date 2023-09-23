import React from "react";
import NiftyBuild from "../../../backend/build/contracts/Nifty";
import {
  serialize,
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

import "./index.css";

import { NavBar } from "../NavBar/main.jsx";

export const NFT = () => {
  const { address } = useAccount();

  var contractAddr = NiftyBuild.networks[5].address;
  var NiftyContract = {
    address: contractAddr,
    abi: NiftyBuild.abi,
  };

  //const { config, error, isError } = usePrepareContractWrite({
  //    address: contractAddr,
  //    abi: [
  //        {
  //            name: '',
  //            type: 'function',
  //            stateMutability: 'nonpayable',
  //            inputs: [],
  //            outputs: [],
  //        },
  //    ],
  //    functionName: 'mint',
  //})
  //const { data, write } = useContractWrite(config)

  let userId = 1;

    const { data, isError, isLoading, isSuccess } = useContractReads({
    contracts: [
      {
        ...NiftyContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...NiftyContract,
        functionName: "tokenURI",
        args: [userId],
      },
      {
        ...NiftyContract,
        functionName: "userTokenIDs",
        args: [address],
      },
    ],
  });

    return (
        <>
          <NavBar />
          <div className="NFT-box">
            <h1>Collections</h1>
            {!isLoading && (
                <div>
                  <p>The user possesses: {data[0].result.toString()} NFTs</p>
                  <div className="container-fluid text-center">
                    <div className="row">
                      {data[2].result.map((idx, i) => {
                          userId = data[2].result[idx];
                          return (
                              <div
                                key={idx}
                                className="cusCard"
                              >
                                <img
                                  className="card-img-top"
                                  alt="NFT Photo"
                                  src={data[1].result.toString()}
                              onClick={() => alert(`The address of the collectible is ${contractAddr}`)}
                                ></img>
                                <div className="card-body">
                                  <p className="card-text text-white">
                                    The Token Id is {data[2].result[i].toString()}{" "}
                                  </p>
                                </div>
                              </div>
                          );
                      })}
                    </div>
                  </div>
                </div>
            )}
            {isError && <div>Error: {isError}</div>}
          </div>
        </>
    );
};
