import { ethers } from 'ethers';

import React, { useContext } from 'react';
import { WalletContext } from './utils/WalletProvider';

const RegisterOrganizationToken = () => {
  const { defaultAccount, userBalance, accountChangedHandler } = useContext(
    WalletContext
  );

  return (
    <div>
      <h2>Other Page</h2>
      <p>Default Account: {defaultAccount}</p>
      <p>User Balance: {userBalance}</p>
      <button onClick={() => accountChangedHandler('newAccount')}>
        Change Account
      </button>
    </div>
  );
};

export default RegisterOrganizationToken;
