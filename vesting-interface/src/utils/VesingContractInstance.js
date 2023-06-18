import { ethers } from 'ethers';
import Web3 from 'web3';
// ABI (Application Binary Interface) of the VestingContract.sol contract
const vestingContractABI = require('./VestingContract.json');

let vestingContract;

// Check if Web3 is available
if (typeof window.ethereum !== 'undefined') {
  // Web3 provider from the injected Ethereum provider (e.g., Metamask)
  const web3Provider = new Web3(window.ethereum);

  // set up provider
  const provider = new ethers.providers.Web3Provider(web3Provider.currentProvider);

  // Address of the VestingContract.sol contract
  const contractAddress = '0xfC50Ae26CF1EdEC244dDcD2186ba2A2D857CaAD3';

  // Creating the VestingContract.sol contract instance
  vestingContract = new ethers.Contract(contractAddress, contractAbi, provider);
} else {
  // Handle the case when Web3 is not available
  console.error('Web3 is not available');
}

export default vestingContract;
