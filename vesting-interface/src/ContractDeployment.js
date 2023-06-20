import React, { useState } from 'react';
import { ethers } from 'ethers';
import CustomTokenContract from './contracts/CustomToken.json';

const ContractDeployment = ({ wallet }) => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const deployContract = async () => {
    if (!window.ethereum || !wallet) {
      console.log('Wallet not connected');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const factory = new ethers.ContractFactory(
        CustomTokenContract.abi,
        CustomTokenContract.bytecode,
        signer
      );

      const contract = await factory.deploy(tokenName, tokenSymbol, totalSupply);
      console.log('CustomToken contract deployed to address:', contract.address);
      await contract.deployTransaction.wait();
      console.log('Contract deployment transaction receipt:', contract.deployTransaction);
    } catch (error) {
      console.log('Error deploying contract:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
        <div className="max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-bold mb-2">Register Your Organization By Creating Its Custom Token In Admin Capacity</h2>
        <h4 className="text-sm text-center mb-4 w-full py-2 px-4 text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          This DApp is built on the Polygon Mumbai Network
        </h4>
      {wallet && (
        <div className="mt-4">
          <label className="block">
            <span className="text-green-900">Token Name:</span>
            <input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block mt-2">
            <span className="text-green-900">Token Symbol:</span>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="block mt-2">
            <span className="text-green-900">Total Supply:</span>
            <input
              type="text"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={deployContract}
          >
            Create Organization Token
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default ContractDeployment;
