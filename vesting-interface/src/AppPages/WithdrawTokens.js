import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVestingContract from '../contracts/TokenVesting.json';

const WithdrawTokens = ({ wallet }) => {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [whitelistedAddresses, setWhitelistedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    // Initialize the contract instance
    const initContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenVestingContract = new ethers.Contract(
          contractAddress,
          TokenVestingContract.abi,
          signer
        );
        setContract(tokenVestingContract);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    if (contractAddress) {
      initContract();
    }
  }, [contractAddress]);

  const handleGetWhitelistedAddresses = async () => {
    try {
      const addresses = await contract.getWhitelistedAddresses();
      setWhitelistedAddresses(addresses);
    } catch (error) {
      console.error('Error getting whitelisted addresses:', error);
    }
  };

  const handleWithdrawTokens = async () => {
    try {
      const tx = await contract.releaseTokens();
      await tx.wait();
      console.log('Tokens withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
      <div className="max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-white bg-green-900 text-center font-bold rounded-md mb-2">
          Withdraw Tokens
        </h2>
        <div className="flex flex-col items-center">
          <label htmlFor="contractAddress" className="block mt-2 text-sm text-blue-600">
            Contract Address:  
          </label>
          <input
            type="text"
            id="contractAddress"
            placeholder="Paste the TokenVesting contract address"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          <button
            className="bg-green-900 hover:bg-green-800 text-white font-medium px-4 py-2 rounded-md mt-2"
            onClick={handleGetWhitelistedAddresses}
          >
            Get Whitelisted Addresses
          </button>

          {whitelistedAddresses.length > 0 && (
            <>
              <label htmlFor="selectedAddress" className="block mt-4 text-sm text-blue-600">
                Select Address:
              </label>
              <select
                id="selectedAddress"
                className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">-- Select an address --</option>
                {whitelistedAddresses.map((address) => (
                  <option key={address} value={address}>
                    {address}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-900 hover:bg-green-800 text-white font-medium px-4 py-2 rounded-md mt-2"
                disabled={!selectedAddress}
                onClick={handleWithdrawTokens}
              >
                Withdraw Tokens
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawTokens;
