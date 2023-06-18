import { ethers } from 'ethers';
import Web3 from 'web3';
// ABI (Application Binary Interface) of the CustomToken.sol contract
const contractAbi = require('./CustomToken.json');

let customTokenContract;

// Check if Web3 is available
if (typeof window.ethereum !== 'undefined') {
  // Web3 provider from the injected Ethereum provider (e.g., Metamask)
  const web3Provider = new Web3(window.ethereum);

  // set up provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Address of the CustomToken.sol contract
  const contractAddress = '0xCF23CcD7160CA7Bb2f72216a55b622C207933192';

  // Creating the CustomToken.sol contract instance
  customTokenContract = new ethers.Contract(contractAddress, contractAbi, provider);
} else {
  // Handle the case when Web3 is not available
  console.error('Web3 is not available');
}

export default customTokenContract;
