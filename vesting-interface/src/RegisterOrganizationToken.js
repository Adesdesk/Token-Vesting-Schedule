import React, { useContext } from 'react';
import { WalletContext } from './WalletProvider';

const RegisterOrganizationToken = () => {
  const { defaultAccount, userBalance, accountChangedHandler } = useContext(
    WalletContext
  );

  // Use the defaultAccount and userBalance as needed

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
        <button
          className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => accountChangedHandler('newAccount')}
        >
          Change Account
  </button>
      </div>
    </div>
  );
};

export default RegisterOrganizationToken;
