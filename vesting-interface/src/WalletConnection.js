import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletConnection = ({ onConnect }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletConnected(true);
                onConnect();
            } catch (error) {
                console.log('Error connecting wallet:', error);
            }
        } else {
            console.log('No Ethereum wallet found');
        }
    };

    const handleNavigateToContractDeployment = () => {
        navigate('/register-organization-token');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
            <h2 className="text-2xl text-center text-white font-bold mb-2">
                Welcome to Organizations' Token Vesting DApp by Adesdesk
            </h2>
            <div className="mt-5">
                {!walletConnected && (


                    <button
                        className="bg-red-700 text-2xl hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={connectWallet}
                    >
                        Connect Ethereum Wallet
                    </button>

                )}
                {walletConnected && (
                    <button
                        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleNavigateToContractDeployment}
                    >
                        Connected! Proceed to Register an Organization </button>
                )}
            </div>
        </div>
    );
};

export default WalletConnection;
