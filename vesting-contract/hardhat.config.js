require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};


/*require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

// @type import('hardhat/config').HardhatUserConfig 

module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId: 1337, // Chain ID of the Hardhat local blockchain
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};*/