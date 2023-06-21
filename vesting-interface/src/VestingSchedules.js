import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VestingContract from './contracts/VestingContract.json';

const VestingSchedules = ({ wallet }) => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [walletConnectionStatus, setWalletConnectionStatus] = useState('');
    const [deploymentStatus, setDeploymentStatus] = useState('');

    useEffect(() => {
        setWalletConnectionStatus(wallet ? 'Wallet connection active. Kindly proceed with Transactions' : 'Wallet connection inactive. Please reconnect');
    }, [wallet]);

    const deployContract = async () => {
        if (!window.ethereum || !wallet) {
            setDeploymentStatus('Wallet connection inactive');
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
            setDeploymentStatus('Contract deployment in progress...');
            await contract.deployTransaction.wait();
            setDeploymentStatus('Organization Token successfully created. \n Organization Token address:', contract.address);
            console.log('Organization Token address is:', contract.address);
            console.log('Organization Token creation transaction receipt:', contract.deployTransaction);
        } catch (error) {
            setDeploymentStatus(`Error creating Organization Token: ${error.message}`);
            console.log('Error creating Organization Token:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
            <div className="max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-bold mb-2">
                    Register Your Organization By Creating Its Custom Token In Admin Capacity
                </h2>
                <h4 className="text-sm text-center mb-4 w-full py-2 px-4 text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    This DApp is built on the Polygon Mumbai Network
                </h4>
                {walletConnectionStatus && (
                    <div className="mb-4">
                        <p className="text-center text-white bg-blue-500">{walletConnectionStatus}</p>
                    </div>
                )}
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
                        <div className="flex flex-col items-center">
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={deployContract}
                        >
                            Create Organization Token
                        </button>
                        </div>
                    </div>
                )}
                {deploymentStatus && (
                    <div className="mt-4">
                        <p>{deploymentStatus}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VestingSchedules;