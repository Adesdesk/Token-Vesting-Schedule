import { useState } from 'react';
import { ethers } from 'ethers';
import TokenContractJSON from '../contractABIs/TokenContract.json';
import 'tailwindcss/tailwind.css';

const tokenContractABI = TokenContractJSON.abi;
const tokenContractBytecode = TokenContractJSON.bytecode;

export default function DeployContractForm() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [contractAddress, setContractAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  async function connectWallet() {
    try {
      setIsConnecting(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnecting(false);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setIsConnecting(false);
      setError('Failed to connect wallet');
    }
  }

  async function deployContract() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ethers.ContractFactory(tokenContractABI, tokenContractBytecode, signer);
      const contract = await factory.deploy(tokenName, tokenSymbol, totalSupply);
      await contract.deployed();

      console.log('Contract deployed successfully. Address:', contract.address);
      setContractAddress(contract.address);
    } catch (error) {
      console.error('Error deploying contract:', error);
      setError('Failed to deploy contract');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 mx-auto">
        
      <div className="text-center mt-4">
        <button
          className={`text-blue-500 px-4 py-2 rounded bg-white hover:underline ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Deploy Your Organization's Token Contract</h1>

      {contractAddress ? (
        <div className="bg-green-100 border border-green-300 text-green-900 px-4 py-3 rounded mb-4">
          Contract deployed successfully. Address: {contractAddress}
        </div>
      ) : null}

      {error ? (
        <div className="bg-red-100 border border-red-300 text-red-900 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : null}

      <div className="flex mb-4">
        <label className="w-1/3 text-right mr-4">Token Name:</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 flex-grow"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
      </div>

      <div className="flex mb-4">
        <label className="w-1/3 text-right mr-4">Token Symbol:</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 flex-grow"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
      </div>

      <div className="flex mb-4">
        <label className="w-1/3 text-right mr-4">Total Supply:</label>
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 flex-grow"
          value={totalSupply}
          onChange={(e) => setTotalSupply(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={deployContract}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Deploy Contract'}
        </button>
      </div>
    </div>
  );
}
