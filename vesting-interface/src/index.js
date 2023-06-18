import React from 'react';
// import { ethers } from 'ethers';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import RegisterOrganizationToken from './RegisterOrganizationToken';
import AddStakeholder from './AddStakeholder';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './WalletProvider';

const rootElement = document.getElementById('root');
// const provider = new ethers.providers.Web3Provider(window.ethereum);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterOrganizationToken />} />
          <Route path="/add-stakeholder" element={<AddStakeholder />} />
        </Routes>
      </WalletProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
