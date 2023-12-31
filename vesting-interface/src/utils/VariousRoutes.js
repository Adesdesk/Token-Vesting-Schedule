import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WalletConnection from '../AppPages/WalletConnection';
import RegisterOrganizationToken from '../AppPages/RegisterOrganizationToken';
import AddStakeholderAndSchedules from '../AppPages/AddStakeholderAndSchedules';
import WithdrawTokens from '../AppPages/WithdrawTokens';
import AdminAddWhitelistedAddresses from '../AppPages/AdminAddWhitelistedAddresses';

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
          path="/" element={<WalletConnection onConnect={handleWalletConnect} />}/>
        <Route exact path="/register-organization-token" element={<RegisterOrganizationToken wallet={wallet} />} />
        <Route exact path="/add-stakeholder-and-vesting" element={<AddStakeholderAndSchedules wallet={wallet} />} />
        <Route exact path="/make-withdrawal" element={<WithdrawTokens wallet={wallet} />} />
        <Route exact path="/whitelist-addresses" element={<AdminAddWhitelistedAddresses wallet={wallet} />} />
      </Routes>
    </Router>
  );
};

export default VariousRoutes;
