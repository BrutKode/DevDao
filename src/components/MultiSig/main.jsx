import { React, useState } from "react";
import MultiSigFactory from "../../../backend/build/contracts/MultiSigFactory";
import {
    serialize,
    useAccount,
    useContractReads,
    usePrepareContractWrite,
    useContractWrite,
} from "wagmi";

import { InputNumber, Input, Tooltip } from "antd";
import "../Home/Home.css";
import "./main.css";

import { NavBar } from "../NavBar/main.jsx";
import { MulInfo } from "./info.jsx";

export const MultiSig = () => {

    const { address } = useAccount();

    var contractAddr = MultiSigFactory.networks[5].address;
    var MultiSigContract = {
        address: contractAddr,
        abi: MultiSigFactory.abi,
    };

    const [receiver, setRecepient] = useState(0x0);
    const [depoAmt, setDepoAmt] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`User registered ${depoAmt} in contract for ${receiver} from ${address}`);
    }

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: MultiSigContract.address,
        abi: MultiSigContract.abi,
        functionName: 'enroll',
        args: [receiver],
        value: (depoAmt * 10 ** 18).toString(),
    })

    return (
        <>
          <NavBar />
          <div className="ailment">
            <form className="enrollForm" onSubmit={(e) => handleSubmit(e)}>
              <h3>Employ a developer!</h3>
              <div className="input-group mb-3">
                <span className="cusProp input-group-text" id="basic-addon1">Address of Developer </span>
                <Input
                  type="textarea"
                  style={{ width: 200, fontSize: "medium" }}
                  defaultValue="0x0"
                  onChange={(e) => setRecepient(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="cusProp input-group-text" id="basic-addon1">Deposit Amount </span>
                <InputNumber
                  style={{ width: 200, fontSize: "medium" }}
                  defaultValue="0"
                  min="0"
                  max="10"
                  step="0.0001"
                  onChange={(e) => {setDepoAmt(e)}}
                  stringMode
                />
              </div>
              <button className="cusButton" onClick={() => write()}>Submit</button>
            </form>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            <MulInfo />
          </div>
        </>
    );
}
