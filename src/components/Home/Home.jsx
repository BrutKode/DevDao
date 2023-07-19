import React from "react";
import { useAccount, useSignMessage } from "wagmi";

export const Home = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Welcome to developer dao captain, get ready to sail!",
  });
  return (
    <div>
      <p>Your Account: {address}</p>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
};
