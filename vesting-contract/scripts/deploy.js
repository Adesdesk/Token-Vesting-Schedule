// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Deploy script for Token smart contract on Hardhat

// Import Hardhat environment and Ethereum libraries
const hre = require("hardhat");


// Set up Ethereum wallet
const [deployer] = await ethers.getSigners();

// Indicate a grab of CustomToken.sol
console.log("Deploying the CustomToken contract with the account:", deployer.address);


async function deploy() {
  // Deploy CustomToken contract
  // Set up the CustomToken contract factory
  const CustomToken = await hre.ethers.getContractFactory("CustomToken");
  const customToken = await CustomToken.deploy();
  await customToken.deployed();
  // Display CustomToken contract deployment details
  console.log("CustomToken deployed to:", customToken.address);

  // Deploy VestingContract contract
  // Set up the VestingContract contract factory
  const VestingContract = await hre.ethers.getContractFactory("VestingContract");
  const vestingContract = await VestingContract.deploy(customToken.address);
  await vestingContract.deployed();
  // Display VestingContract contract deployment details
  console.log("VestingContract deployed to:", vestingContract.address);
}

// invoke the deploy() function
deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });





