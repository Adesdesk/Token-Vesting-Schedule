import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletCard from './index.js';
import 'tailwindcss/tailwind.css';

const TokenInteraction = ({ WalletCard }) => {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [approvalAmount, setApprovalAmount] = useState('');

  const handleTransfer = async () => {
    try {
      const contractAddress = '0x196A4868d590afc7C6DDc6c67bE738DE97aAcd33';
      const contractABI = require('../contractABIs/CompanyToken.json'); // Replace with the actual contract ABI

      // Create an instance of the contract using the wallet's provider
      const contract = new ethers.Contract(contractAddress, contractABI, WalletCard.provider);

      // Perform the transfer by calling the contract's transfer function
      const transaction = await contract.transfer(transferTo, transferAmount);
      await transaction.wait();

      console.log('Transfer successful!');
    } catch (error) {
      console.error('Transfer error:', error);
    }
  };

  const handleApproval = async () => {
    try {
      const contractAddress = 'CONTRACT_ADDRESS'; // Replace with the actual contract address
      const contractABI = ['ABI_ARRAY']; // Replace with the actual contract ABI

      // Create an instance of the contract using the WalletCard's provider
      const contract = new ethers.Contract(contractAddress, contractABI, WalletCard.provider);

      // Perform the approval by calling the contract's approve function
      const transaction = await contract.approve(WalletCard.address, approvalAmount);
      await transaction.wait();

      console.log('Approval successful!');
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <h4 className="text-2xl font-bold mb-4">Token Interaction</h4>
      <div className="mb-4">
        <h5 className="text-lg font-semibold mb-2">Transfer Tokens</h5>
        <input
          className="border border-black rounded-md py-2 px-4 mb-2 w-full"
          type="text"
          placeholder="Recipient address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <input
          className="border border-black rounded-md py-2 px-4 mb-2 w-full"
          type="text"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4"
          onClick={handleTransfer}
        >
          Transfer
        </button>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-2">Approve Spending</h5>
        <input
          className="border border-black rounded-md py-2 px-4 mb-2 w-full"
          type="text"
          placeholder="Amount"
          value={approvalAmount}
          onChange={(e) => setApprovalAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4"
          onClick={handleApproval}
        >
          Approve
        </button>
      </div>
    </div>
  );  
};

export default TokenInteraction;
