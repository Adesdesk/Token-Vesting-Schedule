import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletProvider';

const RegisterOrganizationToken = ({ customTokenContract }) => {
  const { defaultAccount, userBalance, accountChangedHandler } = useContext(
    WalletContext
  );
  const [customName, setCustomName] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const mintCustomToken = async () => {
    try {
      await customTokenContract.methods
        .mintCustomToken(customName, customSymbol, totalSupply)
        .send({ from: defaultAccount });
      // Custom token minted successfully, perform any necessary actions
    } catch (error) {
      // Handle error during token minting
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Register an Organization and Token</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">Default Account:</p>
          <p className="text-gray-600">{defaultAccount}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">User Balance:</p>
          <p className="text-gray-600">{userBalance}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="customName" className="text-lg font-semibold">
            Custom Token Name:
          </label>
          <input
            type="text"
            id="customName"
            className="border border-gray-400 p-2 rounded-md w-full"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customSymbol" className="text-lg font-semibold">
            Custom Token Symbol:
          </label>
          <input
            type="text"
            id="customSymbol"
            className="border border-gray-400 p-2 rounded-md w-full"
            value={customSymbol}
            onChange={(e) => setCustomSymbol(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalSupply" className="text-lg font-semibold">
            Total Supply:
          </label>
          <input
            type="number"
            id="totalSupply"
            className="border border-gray-400 p-2 rounded-md w-full"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={mintCustomToken}
          disabled={!defaultAccount || !customName || !customSymbol || !totalSupply}
        >
          Mint Custom Token
        </button>
        <button
          className="w-full py-2 mt-4 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => accountChangedHandler('newAccount')}
        >
          Change Account
        </button>
      </div>
    </div>
  );
};

export default RegisterOrganizationToken;
