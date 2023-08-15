import React from "react";
import NiftyBuild from "../../../backend/build/contracts/Nifty";
import { serialize, useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from "wagmi";

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
                args: [1],
            },
        ],
    });

    return (
        <>
          <p>Contract Deployed To: {contractAddr}</p>
          { !isLoading &&
            <p>The user possesses: { data.toString() } NFTs</p>
          }
          {isError && <div>Error: {isError}</div>}
        </>
    );
}
