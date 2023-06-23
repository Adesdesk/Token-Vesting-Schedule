import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVestingContract from '../contracts/TokenVestingVII.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const AddStakeholderAndSchedules = ({ wallet }) => {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [category, setCategory] = useState('');
  const [totalTokens, setTotalTokens] = useState('');
  const [releaseStart, setReleaseStart] = useState('');
  const [releaseEnd, setReleaseEnd] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [addressToAdd, setAddressToAdd] = useState('');
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleCategoryChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '0' || inputValue === '1' || inputValue === '2') {
      setCategory(inputValue);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid category (0 for Community, 1 for Validators, or 2 for Investors).');
    }
  };

  const handleButtonClick = async () => {
    try {
      if (contract) {
        // Call createVestingSchedule function
        const parsedTokens = ethers.utils.parseUnits(totalTokens.toString(), 0);
        const parsedStart = Math.floor(new Date(releaseStart).getTime() / 1000);
        const parsedEnd = Math.floor(new Date(releaseEnd).getTime() / 1000);

        const createScheduleTx = await contract.createVestingSchedule(
          category,
          parsedTokens,
          parsedStart,
          parsedEnd,
          numberOfInstallments
        );
        setNotice('Creating vesting schedule... Please wait.');
        await createScheduleTx.wait();
        setNotice('Vesting schedule created successfully! Next trxn will categorize the address provided');

        const categorizedTx = await contract.setCategorizedAddress(addressToAdd, category);
        setNotice('Categorizing stakeholder address... Please wait.');
        await categorizedTx.wait();
        setNotice('Stakeholder address categorized successfully!');

        // Reset input fields and notice
        setAddressToAdd('');
        setCategory('');
        setTotalTokens('');
        setReleaseStart('');
        setReleaseEnd('');
        setNumberOfInstallments('');
      }
    } catch (error) {
      console.error('Error handling button click:', error);
      setNotice('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
      <NavigationBar />
      <br></br>
      <div className="max-w-lg px-4 mt-10 py-2 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white bg-green-900 text-center font-bold rounded-md mb-2">
          Add Stakeholder and Create Vesting Schedule
        </h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <label htmlFor="contractAddress" className="block mt-2 text-sm text-white">
              Your Organization's Token Vesting Contract Address:
            </label>
            <input
              type="text"
              id="contractAddress"
              placeholder="Paste your organization's custom token vesting contract address"
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
              onChange={handleCategoryChange}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} <br></br>

            <label htmlFor="totalTokens" className="block mt-2 text-sm text-blue-600">
              Amount of Tokens to release:
            </label>
            <input
              type="number"
              id="totalTokens"
              placeholder="Amount of tokens to release over specific time"
              className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={totalTokens}
              onChange={(e) => setTotalTokens(e.target.value)}
            /> <br></br>

            <label htmlFor="numberOfInstallments" className="block mt-2 text-sm text-blue-600">
              Number of Installments:
            </label>
            <input
              type="number"
              id="numberOfInstallments"
              placeholder="Number of installments that tokens should be released"
              className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={numberOfInstallments}
              onChange={(e) => setNumberOfInstallments(e.target.value)}
            /><br></br>


            <label htmlFor="releaseStart" className="block mt-2 text-sm text-blue-600">
              Token Release Start Date:
            </label>
            <input
              type="date"
              id="releaseStart"
              className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={releaseStart}
              onChange={(e) => setReleaseStart(e.target.value)}
            /><br></br>

            <label htmlFor="releaseEnd" className="block mt-2 text-sm text-blue-600">
              Token Release End Date:
            </label>
            <input
              type="date"
              id="releaseEnd"
              className="mt-1 block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={releaseEnd}
              onChange={(e) => setReleaseEnd(e.target.value)}
            /><br></br>
            <label htmlFor="addressToAdd" className="block mt-2 text-sm text-blue-600">
              Address to add to defined category:
            </label>
            <input
              type="text"
              id="addressToAdd"
              placeholder="Address to categorize as Community, Validators, or Investors"
              className="block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={addressToAdd}
              onChange={(e) => setAddressToAdd(e.target.value)}
            />
            {notice && <p className="text-red-600 text-center mb-2">{notice}</p>}
            <button
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md mt-2"
              onClick={handleButtonClick}
            >
              Add Stakeholder's Vesting Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStakeholderAndSchedules;
