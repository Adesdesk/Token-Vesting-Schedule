import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import 'tailwindcss/tailwind.css'


const WalletCard = () => {
const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [userBalance, setUserBalance] = useState(null);
const [connButtonText, setConnButtonText] = useState('Connect Wallet');

useEffect(() => {
const accountChangedHandler = (newAccount) => {
setDefaultAccount(newAccount);
getAccountBalance(newAccount.toString());
};
const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  
  const chainChangedHandler = () => {
    window.location.reload();
  };
  
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');
  
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage(
        'Please install MetaMask browser extension to interact'
      );
    }
  };
  
  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);
  
  return () => {
    window.ethereum.off('accountsChanged', accountChangedHandler);
    window.ethereum.off('chainChanged', chainChangedHandler);
  };
}, []);

return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
<h4>Connect Metamask</h4>
<button onClick={connectWalletHandler}>{connButtonText}</button>
<div className={styles.accountDisplay}>
<h3>Address: {defaultAccount}</h3>
</div>
<div className={styles.balanceDisplay}>
<h3>Balance: {userBalance}</h3>
</div>
{errorMessage}
</div>
);
};

export default WalletCard; 