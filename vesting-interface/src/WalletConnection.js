import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletConnection = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigateToContractDeployment = () => {
    navigate('/contract-deployment'); // Navigate to the ContractDeployment page
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-green-900">
      <div className="mt-5">
        {!walletConnected && (
          <button
            className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        {walletConnected && (
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleNavigateToContractDeployment}
          >
            Connected! Proceed to Register Organization </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;
