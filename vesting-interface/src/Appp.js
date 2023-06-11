import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import OrganizationContract from './contracts/Organization.json';
import TokenContract from './contracts/Token.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [organizationContract, setOrganizationContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        // Connect to Ethereum provider
        if (window.ethereum) {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);

          const signer = provider.getSigner();
          setSigner(signer);

          const accounts = await provider.listAccounts();
          setAccounts(accounts);

          const networkId = await provider.getNetwork().then((network) => network.chainId);
          const organizationContractData = OrganizationContract.networks[networkId];
          const organizationContract = new ethers.Contract(
            organizationContractData.address,
            OrganizationContract.abi,
            signer
          );
          setOrganizationContract(organizationContract);

          const tokenContractData = TokenContract.networks[networkId];
          const tokenContract = new ethers.Contract(
            tokenContractData.address,
            TokenContract.abi,
            signer
          );
          setTokenContract(tokenContract);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadBlockchainData();
  }, []);

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.enable();
      const accounts = await provider.listAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterOrganization = async () => {
    try {
      const organizationAddress = accounts[0]; // Assuming the first account is the admin
      await organizationContract.registerOrganization(tokenContract.address);
      setIsAdmin(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStakeholder = async (stakeholderAddress, vestingPeriod) => {
    try {
      const organizationAddress = accounts[0]; // Assuming the first account is the admin
      await organizationContract.addStakeholder(stakeholderAddress, vestingPeriod);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateWhitelistStatus = async (stakeholderAddress, isWhitelisted) => {
    try {
      const organizationAddress = accounts[0]; // Assuming the first account is the admin
      await organizationContract.updateWhitelistStatus(stakeholderAddress, isWhitelisted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawTokens = async () => {
    try {
      const userAddress = accounts[0];
      const isStakeholder = await organizationContract.stakeholders(userAddress);
      const isWhitelisted = isStakeholder.isWhitelisted;

      if (isWhitelisted) {
        // If the user is whitelisted, they can withdraw tokens
        const tokenVesting = new ethers.Contract(TokenVesting.address, TokenVesting.abi, signer);
        await tokenVesting.createVestingSchedule(userAddress, 0, Date.now());
      } else {
        // If the user is not whitelisted, only the admin can withdraw tokens
        const organizationAddress = accounts[0]; // Assuming the first account is the admin
        await tokenContract.transfer(organizationAddress, 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="container mx-auto">
        {/* Page 1: Connect Wallet */}
        <div className="py-8">
          <h1 className="text-2xl font-bold text-center">Connect Wallet</h1>
          {accounts.length === 0 ? (
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <p className="mt-4 text-green-500">Connected Wallet: {accounts[0]}</p>
          )}
        </div>

        {/* Page 2: Register Organization */}
        <div className={`py-8 ${accounts.length === 0 ? 'hidden' : ''}`}>
          <h1 className="text-2xl font-bold text-center">Register Organization</h1>
          {isAdmin ? (
            <p className="mt-4 text-green-500">Organization Registered</p>
          ) : (
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleRegisterOrganization}
            >
              Register Organization
            </button>
          )}
        </div>

        {/* Page 3: Add Stakeholder */}
        <div className={`py-8 ${accounts.length === 0 || !isAdmin ? 'hidden' : ''}`}>
          <h1 className="text-2xl font-bold text-center">Add Stakeholder</h1>
          <form
            className="flex flex-col items-center justify-center mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const stakeholderAddress = e.target.elements.stakeholderAddress.value;
              const vestingPeriod = e.target.elements.vestingPeriod.value;
              handleAddStakeholder(stakeholderAddress, vestingPeriod);
            }}
          >
            <input
              type="text"
              name="stakeholderAddress"
              placeholder="Stakeholder Address"
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="vestingPeriod"
              placeholder="Vesting Period"
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Stakeholder
            </button>
          </form>
        </div>

        {/* Page 4: Update Whitelist Status */}
        <div className={`py-8 ${accounts.length === 0 || !isAdmin ? 'hidden' : ''}`}>
          <h1 className="text-2xl font-bold text-center">Update Whitelist Status</h1>
          <form
            className="flex flex-col items-center justify-center mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const stakeholderAddress = e.target.elements.stakeholderAddress.value;
              const isWhitelisted = e.target.elements.isWhitelisted.checked;
              handleUpdateWhitelistStatus(stakeholderAddress, isWhitelisted);
            }}
          >
            <input
              type="text"
              name="stakeholderAddress"
              placeholder="Stakeholder Address"
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isWhitelisted" className="w-4 h-4" />
              <span>Whitelisted</span>
            </label>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Update Whitelist Status
            </button>
          </form>
        </div>

        {/* Page 5: Withdraw Tokens */}
        <div className={`py-8 ${accounts.length === 0 ? 'hidden' : ''}`}>
          <h1 className="text-2xl font-bold text-center">Withdraw Tokens</h1>
          {isWhitelisted ? (
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleWithdrawTokens}
            >
              Withdraw Tokens
            </button>
          ) : (
            <p className="mt-4 text-red-500">
              Only the Organization Admin can withdraw tokens for non-whitelisted stakeholders.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
