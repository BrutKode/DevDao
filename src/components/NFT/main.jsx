import React from "react";
import NiftyBuild from "../../../backend/build/contracts/Nifty";
import { useAccount, useNetwork, useContractReads } from "wagmi";

export const NFT = () => {
    const { chain, chains } = useNetwork();

    const account = useAccount();

    var contractAddr = NiftyBuild.networks[chain.id].address;
    var NiftyContract = {
        address: contractAddr,
        abi: NiftyBuild.abi
    };

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...NiftyContract,
                functionName: 'balanceOf',
                args: [account],
            },
        ],
        watch: true,
    });

    return (
        <>
          <p>Contract Deployed To: {contractAddr}</p>
        </>
    );
}
