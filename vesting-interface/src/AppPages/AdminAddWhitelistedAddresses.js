import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVestingContract from '../contracts/TokenVestingVII.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const AdminAddWhitelistedAddresses = ({ wallet }) => {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [addressesToAdd, setAddressesToAdd] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

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

  const handleAddAddresses = async () => {
    try {
      const addresses = addressesToAdd.split('\n').map((address) => address.trim());

      const tx = await contract.whitelistAddresses(addresses);
      await tx.wait();

      setTransactionHash(tx.hash);
      setAddressesToAdd('');
    } catch (error) {
      console.error('Error adding addresses:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
      <NavigationBar />
      <div className="max-w-lg px-4 py-2 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white bg-green-900 text-center font-bold rounded-md mb-2">
          Add Addresses (Admin)
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
          <label htmlFor="addressesToAdd" className="block mt-4 text-sm text-blue-600">
            Addresses to Add (one per line):
          </label>
          <textarea
            id="addressesToAdd"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={addressesToAdd}
            onChange={(e) => setAddressesToAdd(e.target.value)}
          ></textarea>
          <button
            className="bg-green-900 hover:bg-green-800 text-white font-medium px-4 py-2 rounded-md mt-2"
            onClick={handleAddAddresses}
          >
            Add Addresses
          </button>

          {transactionHash && (
            <div className="mt-4">
              <p className="text-yellow-500">Address(es) added successfully! Transaction Hash:</p>
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500"
              >
                {transactionHash}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAddWhitelistedAddresses;
