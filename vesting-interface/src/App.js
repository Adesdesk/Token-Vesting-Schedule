import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const navigate = useNavigate();

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
    // reload the page to avoid any errors with chain change mid-use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const handleButton1Click = () => {
    navigate('/register');
  };

  const handleButton2Click = () => {
    navigate('/add-stakeholder');
  };

  const handleButton3Click = () => {
    navigate('/withdraw');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="max-w-lg px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Connect Ethereum Wallet</h2>
        <h4 className="text-sm mb-4 w-full py-2 px-4 text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          This DApp is built on the Polygon Mumbai Network
        </h4>
        <button
          className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={connectWalletHandler}
        >
          {connButtonText}
        </button>
        <div className="mt-4">
          <h3 className="text-lg">User's Active Address:</h3>
          <p className="text-gray-600">{defaultAccount}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg">User's Current Balance:</h3>
          <p className="text-gray-600">{userBalance}</p>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        {defaultAccount && (
          <div className="fixed bottom-0 right-0 m-4 flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleButton1Click}>
              Register Organization & Token
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add stakeholder & Vesting Schedule
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Make withdrawal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
