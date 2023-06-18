import { ethers } from 'ethers';
import React, { useContext } from 'react';
import { WalletContext } from '../WalletProvider';
// ABI (Application Binary Interface) of the CustomToken.sol contract
const contractAbi = require('./CustomToken.json');

const CustomTokenContract = () => {
  const { signer } = useContext(WalletContext);

  // Check if Web3 is available
  if (typeof window.ethereum !== 'undefined' && signer) {
    // Address of the CustomToken.sol contract
    const contractAddress = '0x50A09F90729199a94012CA92aD80A90F6A53507F';

    // Creating the CustomToken.sol contract instance
    const customTokenContract = new ethers.Contract(contractAddress, contractAbi, signer);

    return customTokenContract;
  } else {
    // Handle the case when Web3 or signer is not available
    console.error('Web3 or signer is not available');
    return null;
  }
};

export default CustomTokenContract;
