import 'tailwindcss/tailwind.css';
import { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';
import CustomTokenABI from '../contractABIs/CustomToken.json';
import VestingContractABI from '../contractABIs/VestingContract.json';
import { connectWallet, getAccountBalance } from '../utils/wallet';
import { WalletContext } from '../contexts/WalletContext';

const customTokenAddress = '0xCF23CcD7160CA7Bb2f72216a55b622C207933192';
const vestingContractAddress = '0xfC50Ae26CF1EdEC244dDcD2186ba2A2D857CaAD3';

export default function RegisterOrgToken() {
  const { isWalletConnected, defaultAccount } = useContext(WalletContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [customName, setCustomName] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [stakingCategory, setStakingCategory] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');
  const [stakingPeriod, setStakingPeriod] = useState('');
  const [vestingSchedules, setVestingSchedules] = useState([]);

  useEffect(() => {
    setAccount(defaultAccount);
    getAccountBalance(defaultAccount).then((balance) => {
      setBalance(balance);
    });
  }, [defaultAccount]);

  const connectWalletHandler = () => {
    connectWallet()
      .then((result) => {
        setAccount(result);
        setErrorMessage(null);
        getAccountBalance(result).then((balance) => {
          setBalance(balance);
        });
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const mintCustomToken = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error('MetaMask is not available');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const customToken = new ethers.Contract(customTokenAddress, CustomTokenABI.abi, signer);

      const tx = await customToken.mintCustomToken(customName, customSymbol, totalSupply);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  const createVestingSchedule = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error('MetaMask is not available');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const vestingContract = new ethers.Contract(
        vestingContractAddress,
        VestingContractABI.abi,
        signer
      );

      const tx = await vestingContract.createVestingSchedule(
        account,
        ethers.utils.parseEther(stakingAmount),
        stakingPeriod,
        stakingCategory
      );
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  const getVestingSchedules = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error('MetaMask is not available');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const vestingContract = new ethers.Contract(
        vestingContractAddress,
        VestingContractABI.abi,
        provider
      );

      const schedules = await vestingContract.vestingSchedules(account, stakingCategory);
      setVestingSchedules(schedules);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-green-200">
      {isWalletConnected ? (
        <>
          <h1>Connected Account: {account}</h1>
          <h2>Account Balance: {balance}</h2>

          <div className="my-4">
            <h2 className="text-xl font-bold mb-2">Add New Organization & Create Its Token</h2>
            <input
              type="text"
              placeholder="Custom Name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Custom Symbol"
              value={customSymbol}
              onChange={(e) => setCustomSymbol(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Total Supply"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button
              onClick={mintCustomToken}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Mint
            </button>
          </div>

          <div className="my-4">
            <h2 className="text-xl font-bold mb-2">Create Vesting Schedule</h2>
            <input
              type="text"
              placeholder="Stakeholder Category"
              value={stakingCategory}
              onChange={(e) => setStakingCategory(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Staking Amount"
              value={stakingAmount}
              onChange={(e) => setStakingAmount(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Staking Period"
              value={stakingPeriod}
              onChange={(e) => setStakingPeriod(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button
              onClick={createVestingSchedule}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>

          <div className="my-4">
            <h2 className="text-xl font-bold mb-2">Get Vesting Schedules</h2>
            <input
              type="text"
              placeholder="Stakeholder Category"
              value={stakingCategory}
              onChange={(e) => setStakingCategory(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button
              onClick={getVestingSchedules}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Schedules
            </button>
            {vestingSchedules.map((schedule, index) => (
              <p key={index}>
                Schedule {index + 1}: Amount: {ethers.utils.formatEther(schedule.amount)}, Vesting Period:{' '}
                {schedule.vestingPeriod.toString()}, Start Time: {schedule.startTime.toString()}
              </p>
            ))}
          </div>
        </>
      ) : (
        <button onClick={connectWalletHandler}>Click to Connect Wallet</button>
      )}
    </div>
  );
}
