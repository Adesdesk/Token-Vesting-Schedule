import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WalletConnection from '../WalletConnection';
import RegisterOrganizationToken from '../RegisterOrganizationToken';

const VariousRoutes = () => {
  const [wallet, setWallet] = useState(null);

  const handleWalletConnect = () => {
    setWallet(window.ethereum);
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<WalletConnection onConnect={handleWalletConnect} />}
        />
        <Route exact path="/register-organization-token" element={<RegisterOrganizationToken wallet={wallet} />} />
      </Routes>
    </Router>
  );
};

export default VariousRoutes;
