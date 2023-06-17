import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import RegisterOrganizationToken from './RegisterOrganizationToken';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './WalletProvider';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterOrganizationToken />} />
        </Routes>
      </WalletProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
