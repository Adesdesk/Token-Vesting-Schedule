import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
    setIsWalletConnected(true);
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
        disabled={isWalletConnected} // Disable button when wallet is connected
      >
        {connButtonText}
      </button>
      <div className="bg-white p-4 rounded-md shadow-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Connected Wallet Address:</h3>
        <p className="text-gray-700">{defaultAccount}</p>
      </div>
      
      {isWalletConnected && (
        <div className="block items-center justify-center">
          <br></br>
          <h1 className='pt-30 pb-8 font-bold '>Success! Now proceed to carry out transactions</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md"><Link href="/token_interaction">Token Creation</Link></button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Register Organization</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Stakeholders</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Vesting Schedules</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Withdrawals</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
