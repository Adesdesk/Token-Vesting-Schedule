import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        onConnect();
      } catch (error) {
        console.log('Error connecting wallet:', error);
      }
    } else {
      console.log('No Ethereum wallet found');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-green-500">
    <div className="mt-5">
      {!walletConnected && (
        <button
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
    </div>
  );
};

export default WalletConnection;
