import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { connectWallet, getAccountBalance } from '../utils/wallet';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState("None");
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Click to Connect Wallet');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWalletHandler = () => {
    connectWallet()
      .then((result) => {
        accountChangedHandler(result);
        setConnButtonText('Wallet Connected');
        getAccountBalance(result).then((balance) => {
          setUserBalance(balance);
        });
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount).then((balance) => {
      setUserBalance(balance);
    });
    setIsWalletConnected(true);
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.ethereum.on('accountsChanged', accountChangedHandler);
      window.ethereum.on('chainChanged', chainChangedHandler);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <h4 className="text-2xl font-bold my-8">Company Token Vesting Adminstrator DApp</h4>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={connectWalletHandler}
        disabled={isWalletConnected} // Disable button when wallet is connected
      >
        {connButtonText}
      </button>
      <div className="bg-white p-4 rounded-md shadow-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Connected Wallet Address:</h3>
        <p className="text-gray-700">{defaultAccount}</p>
      </div>
      
      {isWalletConnected && (
        <div className="block items-center justify-center">
          <br></br>
          <h1 className='pt-30 pb-8 font-bold '>Success! Now proceed to carry out transactions</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md"><Link href="/register-org-token">New Organization</Link></button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md"><Link href="/withdraw-tokens">Claim Tokens</Link></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
