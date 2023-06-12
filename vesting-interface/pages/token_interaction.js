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
      const contractAddress = 'CONTRACT_ADDRESS'; // Replace with the actual contract address
      const contractABI = ['ABI_ARRAY']; // Replace with the actual contract ABI

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
      <h4>Token Interaction</h4>
      <div>
        <h5>Transfer Tokens</h5>
        <input
          type="text"
          placeholder="Recipient address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>
      <div>
        <h5>Approve Spending</h5>
        <input
          type="text"
          placeholder="Amount"
          value={approvalAmount}
          onChange={(e) => setApprovalAmount(e.target.value)}
        />
        <button onClick={handleApproval}>Approve</button>
      </div>
    </div>
  );
};

export default TokenInteraction;
