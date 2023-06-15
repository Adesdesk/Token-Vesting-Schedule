import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import VestingContractABI from '../contractABIs/VestingContract.json';
import { connectWallet, getAccountBalance } from '../utils/wallet';

const vestingContractAddress = '0xfC50Ae26CF1EdEC244dDcD2186ba2A2D857CaAD3';

export default function WithdrawTokens() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [stakingCategory, setStakingCategory] = useState('');
  const [whitelisted, setWhitelisted] = useState(false);

  useEffect(() => {
    connectWalletHandler();
  }, []);
  
  const connectWalletHandler = async () => {
    try {
      const result = await connectWallet();
      accountChangedHandler(result);
      setConnButtonText('Wallet Connected');
      const balance = await getAccountBalance(result);
      setUserBalance(balance);
  
      // Check if the user is whitelisted
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const vestingContract = new ethers.Contract(vestingContractAddress, VestingContractABI.abi, provider);
      const isWhitelisted = await vestingContract.isWhitelisted(account);
      setWhitelisted(isWhitelisted);
    } catch (error) {
      console.error(error);
    }
  };
  

  const withdrawTokens = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error('MetaMask is not available');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const vestingContract = new ethers.Contract(vestingContractAddress, VestingContractABI.abi, signer);

      const tx = await vestingContract.withdrawVestedTokens(stakingCategory);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isWalletConnected ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Connected Account: {account}</h1>
          <h2 className="text-xl font-bold mb-4">Account Balance: {balance}</h2>

          {whitelisted ? (
            <>
              <h2 className="text-xl font-bold mb-4">Withdraw Tokens</h2>
              <input
                type="text"
                placeholder="Staking Category"
                value={stakingCategory}
                onChange={(e) => setStakingCategory(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-2 mb-2"
              />
              <button
                onClick={withdrawTokens}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Withdraw
              </button>
            </>
          ) : (
            <p className="text-red-500">You are not whitelisted to withdraw tokens.</p>
          )}
        </>
      ) : (
        <button
          onClick={connectWalletHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Click to Connect Wallet</button>
      )}
    </div>
  );
}
