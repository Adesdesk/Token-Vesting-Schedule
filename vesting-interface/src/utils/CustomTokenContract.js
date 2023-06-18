import { ethers } from 'ethers';
import CustomTokenABI from './CustomToken.json'

// set up provider
const provider = new ethers.providers.Web3Provider(web3Provider);

// ABI (Application Binary Interface) of the CustomToken.sol contract
const contractAbi = CustomTokenABI.abi;

// Address of the CustomToken.sol contract
const contractAddress = '0xCF23CcD7160CA7Bb2f72216a55b622C207933192';

// Creating the CustomToken.sol contract instance
const customTokenContract = new ethers.Contract(contractAddress, contractAbi, provider);
