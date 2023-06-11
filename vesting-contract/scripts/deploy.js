// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Deploy script for Token smart contract on Hardhat

// Import Hardhat environment and Ethereum libraries
const { ethers } = require("hardhat");

async function main() {
  // Set up Ethereum wallet
  const [deployer] = await ethers.getSigners();

  // Grab MyToken.sol
  console.log("Deploying the Token contract with the account:", deployer.address);
  // Set up the Token contract factory
  const Token = await ethers.getContractFactory("Token");
  const TokenVesting = await ethers.getContractFactory("TokenVesting");
  const Organization = await ethers.getContractFactory("Organization");
  const totalSupply = ethers.utils.parseEther("1000");
  // Deploy the Token contract
  const token = await Token.deploy("CompanyToken", "CTK", totalSupply);

  await token.deployed();
  // display success and address
  console.log("CompanyToken contract deployed to address:", token.address);

  // Deploy the TokenVesting contract
  const tokenVesting = await TokenVesting.deploy(token.address);
  await tokenVesting.deployed();

  // Print TokenVesting contract details
  console.log("TokenVesting contract deployed to:", tokenVesting.address);

  // Deploy the Organization contract
  const organization = await Organization.deploy(token.address);
  await organization.deployed();

  // Print Organization contract details
  console.log("Organization contract deployed to:", organization.address);
  
}


// Run the main function
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});