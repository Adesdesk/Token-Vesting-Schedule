import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CustomTokenContract from '../contracts/CustomToken.json';
import TokenVestingContract from '../contracts/TokenVestingVII.json';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';


const RegisterOrganizationToken = ({ wallet }) => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [walletConnectionStatus, setWalletConnectionStatus] = useState('');
    const [deploymentStatus, setDeploymentStatus] = useState('');
    const [tokenVestingAddress, setTokenVestingAddress] = useState('');
    const [customTokenAddress, setCustomTokenAddress] = useState('');
    const navigate = useNavigate();


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
            const tokenFactory = new ethers.ContractFactory(
                CustomTokenContract.abi,
                CustomTokenContract.bytecode,
                signer
            );

            const tokenContract = await tokenFactory.deploy(tokenName, tokenSymbol, totalSupply);
            setDeploymentStatus('Contracts deployment in progress...');
            await tokenContract.deployTransaction.wait();
            setDeploymentStatus('Organization Token created. Deploying your vesting contract next...');
            setCustomTokenAddress(tokenContract.address);
            console.log('Organization Token address is:', tokenContract.address);
            console.log('Organization Token creation transaction receipt:', tokenContract.deployTransaction);
            const vestingFactory = new ethers.ContractFactory(
                TokenVestingContract.abi,
                TokenVestingContract.bytecode,
                signer
            );
            const vestingContract = await vestingFactory.deploy(tokenContract.address);
            setDeploymentStatus('Creating your organization\'s custom token contract');
            await vestingContract.deployTransaction.wait();
            setDeploymentStatus('Your organization\'s token vesting plan has been successfully created. \n Please keep its contract address for future use');
            setTokenVestingAddress(vestingContract.address);
            console.log('TokenVesting address is:', vestingContract.address);
            console.log('TokenVesting creation transaction receipt:', vestingContract.deployTransaction);
        } catch (error) {
            setDeploymentStatus(`Error creating Organization Token: ${error.message}`);
            console.log('Error creating Organization Token:', error);
        }
    };

    const handleNavigateToTokenVesting = () => {
        navigate('/add-stakeholder-and-vesting');
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col items-left">
                <button
                    className="bg-green-900 text-end text-white font-medium px-4 py-2"
                    onClick={handleNavigateToTokenVesting}
                >
                    Already Registered? Get your contract address and click here to continue.
                </button>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">

                <div className="max-w-lg px-4 py-2 rounded-lg shadow-lg">
                    <h2 className="text-2xl text-center font-bold mb-2">
                        Register Your Organization By Creating Its Custom Token In Admin Capacity
                    </h2>
                    <h4 className="text-sm text-center mb-4 w-full py-2 px-4 text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        This DApp is compatible with various Ethereum test networks
                    </h4>
                    {walletConnectionStatus && (
                        <div className="mb-4">
                            <p className="text-center text-white bg-blue-500">{walletConnectionStatus}</p>
                        </div>
                    )}
                    {wallet && (
                        <div className="mt-4">
                            <label className="block">
                                <span className="text-blue-600">Input Token Name:</span>
                                <input
                                    type="text"
                                    value={tokenName}
                                    onChange={(e) => setTokenName(e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-2 py-1 mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>
                            <label className="block mt-2">
                                <span className="text-blue-600">Input Token Symbol:</span>
                                <input
                                    type="text"
                                    value={tokenSymbol}
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>
                            <label className="block mt-2">
                                <span className="text-blue-600">Input Total Supply:</span>
                                <input
                                    type="text"
                                    value={totalSupply}
                                    onChange={(e) => setTotalSupply(e.target.value)}
                                    className="mt-1 block w-full border rounded-md px-2 py-1 mt-1 rounded-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        <div className="mt-4 text-yellow-500 text-center">
                            <p>{deploymentStatus}</p>
                        </div>
                    )}
                </div>
                <div>
                    {tokenVestingAddress && (

                        <div className="mt-4 text-white text-center">
                            <p>Your organization's token vesting contract address: {tokenVestingAddress}</p>
                            <p>Kindly copy and store this address for admin use in future transacions</p>

                            <button
                                className="bg-blue-700 hover:bg-blue-600 text-white item-center font-bold py-2 px-4 rounded mt-4"
                                onClick={handleNavigateToTokenVesting}
                            >
                                Ready! Click here to add stakeholders and vesting plans </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterOrganizationToken;