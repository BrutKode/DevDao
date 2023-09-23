import React from "react";
import MultiSigFactory from "../../../backend/build/contracts/MultiSigFactory";
import {
    serialize,
    useAccount,
    useContractReads,
} from "wagmi";
import { ethers } from "ethers";

import "./main.css";

export const MulInfo = () => {

    const { address } = useAccount();

    var contractAddr = MultiSigFactory.networks[5].address;
    var MultiSigContract = {
        address: contractAddr,
        abi: MultiSigFactory.abi,
    };

    const { data, isError, isLoading, status } = useContractReads({
        contracts: [
            {
                ...MultiSigContract,
                functionName: 'myBond',
                args: [address],
            },
            {
                ...MultiSigContract,
                functionName: 'myBalance',
                args: [address],
            },
        ],
    })


    return (
        <div className="infotainment">
          {!isLoading &&  (
              data[1].status == "success" && (
                  <div>
                  <p>{`Your bond is deployed to ${data[0].result.toString()} and the value locked in the app is ${ethers.utils.formatEther(data[1].result.toString())} ethereum. Approve the funds to be transferred to the recepient once conditions are applied.`}</p>
                    <p className="bill">Deployment Address: {`${data[0].result.toString()}`}</p>
                    <p className="bill">Due Amount: {`${ethers.utils.formatEther(data[1].result.toString())}`} ETH</p>
                  </div>
              )
          )}
        </div>
    );

}
