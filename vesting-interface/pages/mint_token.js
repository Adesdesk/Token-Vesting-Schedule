import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { connectWallet, getAccountBalance } from './wallet';
import { ethers } from 'ethers';
const Token = require('../contractABIs/TokenContract.json');

const MintPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');

  const deployContract = async () => {
    try {
      const signer = await connectWallet();
      const accountBalance = await getAccountBalance(signer);

      const rpcUrl = 'https://polygon-mumbai.g.alchemy.com/v2/4xqAcLubsZxZcvye8Khs4hcwMDZrHsBp';
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const contractFactory = new ethers.ContractFactory(Token.abi, Token.bytecode, signer);
      const tokenSupplyII = ethers.utils.parseEther(tokenSupply);
      const contract = await contractFactory.connect(provider).deploy(tokenName, tokenSymbol, tokenSupplyII);
      await contract.deployed();

      console.log('Contract deployed:', contract.address);
      console.log('Account balance:', accountBalance);
      setSuccessMessage('Contract deployed successfully!'); // Set success message
      setErrorMessage(null); // Clear error message
      // Perform additional actions with the deployed contract
    } catch (error) {
      setErrorMessage('Contract deployment failed.'); // Set error message
      setSuccessMessage(null); // Clear success message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <h4 className="text-2xl font-bold my-8">Mint Token</h4>
      <div className="bg-white p-4 rounded-md shadow-lg mb-4">
        <label className="text-lg font-semibold mb-2">Token Name:</label>
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <label className="text-lg font-semibold mb-2">Token Symbol:</label>
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
        <label className="text-lg font-semibold mb-2">Token Supply:</label>
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={deployContract}
        >
          Deploy Contract
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default MintPage;
