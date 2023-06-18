import { ethers } from 'ethers';
import VestingContractABI from './VestingContract.json'

// set up provider
const provider = new ethers.providers.Web3Provider(web3Provider);

// ABI (Application Binary Interface) of the VestingContract.sol contract
const vestingContractAbi = VestingContractABI.abi;

// Address of the VestingContract.sol contract
const vestingContractAddress = '0xfC50Ae26CF1EdEC244dDcD2186ba2A2D857CaAD3';

// Creating the VestingContract.sol contract instance
export const vestingContract = new ethers.Contract(vestingContractAddress, vestingContractAbi, provider);
