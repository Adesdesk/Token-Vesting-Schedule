import { ethers } from 'ethers';
import React, { useContext } from 'react';
import { WalletContext } from './utils/WalletProvider';

const RegisterOrganizationToken = () => {
  const { defaultAccount, userBalance, accountChangedHandler } = useContext(
    WalletContext
  );

  // Use the defaultAccount and userBalance as needed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <h2>Register an Organization and Token</h2>
      <p>Default Account: {defaultAccount}</p>
      <p>User Balance: {userBalance}</p>
      <button onClick={() => accountChangedHandler('newAccount')}>
        Change Account
      </button>
    </div>
  );
};

export default RegisterOrganizationToken;

