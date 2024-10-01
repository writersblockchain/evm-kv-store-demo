import './App.css';
import MyImage from './secret-logo.png';
import React, { useState, useEffect } from "react";
import { initializeWeb3Modal } from './config/web3ModalConfig';
import { useInitEthereum } from "./functions/initEthereum";
import Encrypt from './components/Encrypt';
//
import { SecretNetworkClient } from "secretjs";

function App() {
  const [chainId, setChainId] = useState("");

  let query = async () => {
    const secretjs = new SecretNetworkClient({
      url: "https://lcd.testnet.secretsaturn.net",
      chainId: "pulsar-3",
    });
  
    const query_tx = await secretjs.query.compute.queryContract({
      contract_address: process.env.REACT_APP_SECRET_ADDRESS,
      code_hash: process.env.REACT_APP_CODE_HASH,
      query: { retrieve_value: { key: "sean",
        viewing_key: "viewing key"
       } },
    });
    console.log(query_tx);
  };
  
  query();

  useEffect(() => {
    initializeWeb3Modal();
  }, []);

  useInitEthereum(setChainId);

  return (
    <>
    <div className="flex flex-col items-center px-6 py-12 lg:px-8 bg-brand-tan text-brand-orange min-h-screen">
    <div className="connect-wallet-button-container">
        <w3m-button className="connect-wallet-button" />
      </div>
      <p className="text-xl font-bold mt-4">EVM Cross-Chain Encryption Demo</p>
        
      <h6 className="text-xs hover:underline text-brand-blue">
        <a
          href="https://docs.scrt.network/secret-network-documentation/confidential-computing-layer/ibc/storing-encrypted-data-on-secret-network"
          target="_blank"
          rel="noopener noreferrer"
        >
          [click here for docs]
        </a>
      </h6>
      <Encrypt />
     
      <div className="flex justify-center transform scale-50 mt-4">
      <img
        src={MyImage}
        alt="Descriptive Text"
        className="w-18 h-12 mt-8 mb-4"
      />
      </div>
    </div>

  </>
  );
}

export default App;
