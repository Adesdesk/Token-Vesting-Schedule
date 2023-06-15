import { ethers } from 'ethers';

export const connectWallet = () => {
  return new Promise((resolve, reject) => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((error) => {
          reject(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      reject('Please install MetaMask browser extension to interact');
    }
  });
};

export const getAccountBalance = (account) => {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        resolve(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
