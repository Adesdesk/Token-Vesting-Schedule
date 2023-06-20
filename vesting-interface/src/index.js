import React from 'react';
// import { ethers } from 'ethers';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { WalletProvider } from './WalletProvider';

const rootElement = document.getElementById('root');
// const provider = new ethers.providers.Web3Provider(window.ethereum);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/register" element={<RegisterOrganizationToken />} />
          <Route path="/add-stakeholder" element={<AddStakeholder />} /> */}
        </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
