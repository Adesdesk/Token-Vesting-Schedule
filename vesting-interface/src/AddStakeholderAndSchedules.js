import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVestingContract from './contracts/TokenVesting.json';

const AddStakeholderAndSchedules = ({ wallet }) => {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [category, setCategory] = useState('');
  const [totalTokens, setTotalTokens] = useState('');
  const [releaseStart, setReleaseStart] = useState('');
  const [releaseEnd, setReleaseEnd] = useState('');

  useEffect(() => {
    // Initialize the contract instance
    const initContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenVestingContract = new ethers.Contract(contractAddress, TokenVestingContract.abi, signer);
        setContract(tokenVestingContract);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    if (contractAddress) {
      initContract();
    }
  }, [contractAddress]);

  const handleCreateSchedule = async () => {
    try {
      const parsedTokens = ethers.utils.parseUnits(totalTokens.toString(), 0);
      const parsedStart = Math.floor(new Date(releaseStart).getTime() / 1000); // Converting releaseStart to timestamp
      const parsedEnd = Math.floor(new Date(releaseEnd).getTime() / 1000); // Converting releaseEnd to timestamp

      const tx = await contract.createVestingSchedule(category, parsedTokens, parsedStart, parsedEnd);
      await tx.wait();
      console.log('Vesting schedule created successfully!');
    } catch (error) {
      console.error('Error creating vesting schedule:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
      <div className="max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-white bg-green-900 text-center font-bold rounded-md mb-2">
          Add Stakeholder and Create Vesting Schedule
        </h2>
        <div className="flex flex-col items-center">
        
          <label htmlFor="contractAddress" className="block mt-2 text-sm text-blue-600">
            Contract Address:  
          </label>
          <input
            type="text"
            id="contractAddress"
            placeholder="Paste your token vesting plan contract address"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          /> <br></br>
        
          <label htmlFor="category" className="block mt-2 text-sm text-blue-600">
            Stakeholder Category:  
          </label>
          <input
            type="number"
            id="category"
            placeholder="0, 1, or 2 for Community, Validators, or Investors respectively"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> <br></br>
        
          <label htmlFor="totalTokens" className="block mt-2 text-sm text-blue-600">
            Total Tokens:
          </label>
          <input
            type="number"
            id="totalTokens"
            placeholder="Amount of tokens to release over time"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={totalTokens}
            onChange={(e) => setTotalTokens(e.target.value)}
          /> <br></br>
        
          <label htmlFor="releaseStart" className="block mt-2 text-sm text-blue-600">
            Release Start:
          </label>
          <input
            type="date"
            id="releaseStart"
            placeholder="Select start date"
            className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={releaseStart}
            onChange={(e) => setReleaseStart(e.target.value)}
          /><br></br>
        
          <label htmlFor="releaseEnd" className="block mt-2 text-sm text-blue-600">
            Release End: 
          </label>
          <input
            type="date"
            id="releaseEnd"
            placeholder="Select end date"
            className="mt-1 block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={releaseEnd}
            onChange={(e) => setReleaseEnd(e.target.value)}
          /><br></br>
        
        <button
          className="bg-green-900 hover:bg-green-800 text-white font-medium px-4 py-2 rounded-md"
          onClick={handleCreateSchedule}
        >
          Create Vesting Schedule
        </button>
        </div>
      </div>
    </div>
  );
};

export default AddStakeholderAndSchedules;
