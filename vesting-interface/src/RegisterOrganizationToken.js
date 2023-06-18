import { useState } from 'react';
// import { WalletContext } from './WalletProvider';
import customTokenContract from './utils/CustomTokenContract';

const RegisterOrganizationToken = () => {
  // const { defaultAccount } = useContext(WalletContext);
  const [customName, setCustomName] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  const mintCustomToken = async (customName, customSymbol, totalSupply) => {
    try {
      await customTokenContract // Use the imported instance correctly
        .mintCustomToken(customName, customSymbol, totalSupply);
      // Custom token minted successfully
      console.log('Custom token minted successfully');
    } catch (error) {
      // Handle possible errors during token minting
      console.error('Error minting custom token:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Register Organization Token</h2>
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Custom Token Name"
        />
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          type="text"
          value={customSymbol}
          onChange={(e) => setCustomSymbol(e.target.value)}
          placeholder="Custom Token Symbol"
        />
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          type="text"
          value={totalSupply}
          onChange={(e) => setTotalSupply(e.target.value)}
          placeholder="Total Supply"
        />
        <button
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={mintCustomToken}
        >
          Mint Custom Token
        </button>
      </div>
    </div>
  );
};

export default RegisterOrganizationToken;
