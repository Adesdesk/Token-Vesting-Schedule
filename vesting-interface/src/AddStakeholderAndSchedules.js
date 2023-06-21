import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVestingContract from './contracts/TokenVesting.json';

const AddStakeholderAndSchedules = ({ wallet }) => {
    const [tokenVestingAddress, setTokenVestingAddress] = useState('');
    const [stakeholderAddress, setStakeholderAddress] = useState('');
    const [stakeholderCategory, setStakeholderCategory] = useState('');
    const [totalTokens, setTotalTokens] = useState('');
    const [releaseStart, setReleaseStart] = useState('');
    const [releaseEnd, setReleaseEnd] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    useEffect(() => {
        setTransactionStatus('');
    }, [tokenVestingAddress, stakeholderAddress, stakeholderCategory, totalTokens, releaseStart, releaseEnd]);

    const addStakeholderAndSchedule = async () => {
        if (!window.ethereum || !wallet || !tokenVestingAddress) {
            setTransactionStatus('Invalid input or Wallet connection inactive');
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try {
            const tokenVestingContract = new ethers.Contract(tokenVestingAddress, TokenVestingContract.abi, signer);
            // await tokenVestingContract.setCategorizedAddress(stakeholderAddress, stakeholderCategory);
            setTransactionStatus('Stakeholder address and category added successfully');

            await tokenVestingContract.createVestingSchedule(
                stakeholderAddress,
                stakeholderCategory,
                totalTokens,
                releaseStart,
                releaseEnd
            );
            setStakeholderAddress('');
            setStakeholderCategory('');
            setTotalTokens('');
            setReleaseStart('');
            setReleaseEnd('');
            setTransactionStatus('Vesting schedule created successfully');
        } catch (error) {
            setTransactionStatus(`Error adding stakeholder and schedule: ${error.message}`);
            console.log('Error adding stakeholder and schedule:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
            <div className="max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-bold mb-2">
                    Add Stakeholder and Create Vesting Schedule
                </h2>
                {transactionStatus && (
                    <div className="mb-4">
                        <p className="text-center text-white bg-blue-500">{transactionStatus}</p>
                    </div>
                )}
                <div className="mt-4">
                    <label className="block">
                        <span className="text-green-900">TokenVesting Contract Address:</span>
                        <input
                            type="text"
                            value={tokenVestingAddress}
                            onChange={(e) => setTokenVestingAddress(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block mt-2">
                        <span className="text-green-900">Stakeholder Address:</span>
                        <input
                            type="text"
                            value={stakeholderAddress}
                            onChange={(e) => setStakeholderAddress(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block mt-2">
                        <span className="text-green-900">Stakeholder Category:</span>
                        <input
                            type="text"
                            value={stakeholderCategory}
                            onChange={(e) => setStakeholderCategory(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block mt-2">
                        <span className="text-green-900">Total Tokens:</span>
                        <input
                            type="text"
                            value={totalTokens}
                            onChange={(e) => setTotalTokens(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block mt-2">
                        <span className="text-green-900">Release Start:</span>
                        <input
                            type="text"
                            value={releaseStart}
                            onChange={(e) => setReleaseStart(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block mt-2">
                        <span className="text-green-900">Release End:</span>
                        <input
                            type="text"
                            value={releaseEnd}
                            onChange={(e) => setReleaseEnd(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                    <div className="flex flex-col items-center">
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addStakeholderAndSchedule}
                        >
                            Add Stakeholder and Create Vesting Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStakeholderAndSchedules;
