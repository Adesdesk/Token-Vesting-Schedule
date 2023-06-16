import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import './WalletCard.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage(
        'Please install MetaMask browser extension to interact'
      );
    }
  };

  const accountChangedHandler = newAccount => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = account => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
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

  return (
    <div className='walletCard'>
      <div className='walletCardContent'>
      <h2>Connect Ethereum Wallet</h2> 
      <h4>This platform is built on the Polygon Munbai Network</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>User's Active Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>User's Current Balance: {userBalance}</h3>
      </div>
      <br></br>
      {errorMessage}
      </div>
    </div>
  );
};

export default App;