import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import 'tailwindcss/tailwind.css';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.ethereum.on('accountsChanged', accountChangedHandler);
      window.ethereum.on('chainChanged', chainChangedHandler);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <h4 className="text-2xl font-bold my-8">Connect Metamask</h4>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>
      <div className="bg-white p-4 rounded-md shadow-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Connected Wallet Address:</h3>
        <p className="text-gray-700">{defaultAccount}</p>
      </div>
      {/*<div className="bg-white p-4 rounded-md shadow-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Balance:</h3>
        <p className="text-gray-700">{userBalance}</p>
  </div>
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-lg mb-4">
          {errorMessage}
        </div>
      )}*/}
    </div>
  );
};

export default WalletCard;
