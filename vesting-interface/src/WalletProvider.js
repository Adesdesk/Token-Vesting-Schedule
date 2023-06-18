import { ethers } from 'ethers';
import React, { useState, createContext } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [signer, setSigner] = useState(null); // Add signer state

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    setupSigner(newAccount); // Set up signer for the new account
  };

  const setupSigner = async (account) => {
    if (window.ethereum && account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const connectedSigner = provider.getSigner(account);
      setSigner(connectedSigner);
    }
  };

  const getAccountBalance = (account) => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_getBalance', params: [account, 'latest'] })
        .then((balance) => {
          setUserBalance(ethers.utils.formatEther(balance));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <WalletContext.Provider
      value={{ defaultAccount, userBalance, signer }} // Add signer to the context value
    >
      {children}
    </WalletContext.Provider>
  );
};
