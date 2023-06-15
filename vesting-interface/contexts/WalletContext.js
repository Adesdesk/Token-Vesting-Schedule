import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState("None");

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        setIsWalletConnected,
        defaultAccount,
        setDefaultAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
