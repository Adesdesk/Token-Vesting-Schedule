import React, { useState } from 'react';
import WalletConnection from './WalletConnection';
import ContractDeployment from './ContractDeployment';

const App = () => {
  const [wallet, setWallet] = useState(null);

  const handleWalletConnect = () => {
    setWallet(window.ethereum);
  };

  return (
    <div>
      <WalletConnection onConnect={handleWalletConnect} />
      <ContractDeployment wallet={wallet} />
    </div>
  );
};

export default App;
