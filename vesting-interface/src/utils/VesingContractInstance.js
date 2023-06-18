import { ethers } from 'ethers';
import Web3 from 'web3';
// ABI (Application Binary Interface) of the VestingContract.sol contract
const vestingContractABI = require('./VestingContract.json');

let vestingContract;

// Check if Web3 is available
if (typeof window.ethereum !== 'undefined') {

  // set up provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);;

  // Address of the VestingContract.sol contract
  const contractAddress = '0xfBc818e0624B9fE957878329D3a98B4fd8AaFf3d';

  // Creating the VestingContract.sol contract instance
  vestingContract = new ethers.Contract(contractAddress, contractAbi, provider);
} else {
  // Handle the case when Web3 is not available
  console.error('Web3 is not available');
}

export default vestingContract;
