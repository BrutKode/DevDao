import React from "react";
import NiftyBuild from "../../../backend/build/contracts/Nifty";
import { serialize, useAccount, useContractReads, usePrepareContractWrite, useContractWrite } from "wagmi";

export const NFT = () => {
    const { address } = useAccount();

    var contractAddr = NiftyBuild.networks[5].address;
    var NiftyContract = {
        address: contractAddr,
        abi: NiftyBuild.abi
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

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...NiftyContract,
                functionName: 'balanceOf',
                args: [address],
            },
            {
                ...NiftyContract,
                functionName: 'tokenURI',
                args: [userId],
            },
            {
                ...NiftyContract,
                functionName: 'userTokenIDs',
                args: [address],
            },
        ],
    });

    if(!isLoading) {
        for (let i = 0; i < data[2].result.length; i++) {
            console.log(data[2].result[i]);
        }
    }

    return (
        <>
          <p>Contract Deployed To: {contractAddr}</p>
          { !isLoading &&
            <div>
              <p>The user possesses: { data[0].result.toString() } NFTs</p>
              {() => {
                  data[2].result.shift();
                  data[2].result.map((idx,i) => {
                  userId = data[2].result[idx];
                  return (
                      <div>
                        <img alt="NFT Photo" src={ data[1].result.toString() } style={{
                            height: "200px",
                            width: "200px"
                        }}></img>
                        <p>The Token Id is { i }</p>
                      </div>
                  );
                  })}}
              <p>The token IDs are: { data[2].result.toString() }</p>
            </div>
          }
          {isError && <div>Error: {isError}</div>}
        </>
    );
}
