# Token-Vesting-Schedule - Frontend
This is the smart contract component of a decentralized application that provides a platform for organizations to create their custom token and corresponding vesting schedule.

## Description

The DApp consists of two smart contracts, one which enables an rganization's admin to spin off their custom ERC20 token contract, and the other which allows them to create custom token vesting plans for 3 categories of stakeholders namely; Community, Validators, and Investors. The same contract can be adopted by a variety of organizations as each has the liberty to create their token, which address is passed to the a token vesting contract that enables them create their vesting plans for the same token.

Adding these categories of stakeholders is implemented using a custom data type, an enum which index can be supplied during function calls to specify appropriate categories to which an address should belong. Organization admins can add stakeholders and their corresponding vesting details. Vested tokens are released to beneficiary addresses in defined installments for withdrawal as each fragment of the timelock period elapses.

Organizations' admins can whitelist stakeholder addresses to enable them withdraw their released tokens and susch whitelisted addresses can make withdrawals of released tokens, provided they have the address of the contract which is specific to the organization where they belong.

## Getting Started

### Installing

* Clone this repository to get an exact copy of this program on your computer.
* Open the repository folder in your preferred IDE that supports the use of a command line interface. Using the terminal in VSCode is a good option.
* Once in the project folder, navigate into the smart contract folder by running the command
```
cd vesting-contract
```

### Executing program

* Ensure that the terminal now points to the vesting-contract folder, then run the following command
```
npm install
```
* When completed, run the command below to create a .env file in the smart contract root folder where you will supply your environment variables if you wish to deploy the contract in a solidity smart contract development framework.
```
touch .env
```
* In the .env file, input your environment variables as illustrated in the block below.
```
API_URL = 'replace with your exact api url'
PRIVATE_KEY = 'replace this with your wallet private key'
```
* Now, in terminal, run the following command to compile and depoy the smart contracts contained in this repository
* Ensure to replace <your-network> with the name of the network whre you wish to deploy the contracts
```
npx hardhat run --network <your-network> scripts/deploy.js
```
* Look out for a notification of successful contract deployment to an address and copy the TokenVesting contract address for use in interaction with the dapp via the frontend app. 

## Help

Ensure that you have some Eth balance in the wallet which private key you have supplied in the .env file created.

## Authors

Contributor(s) name(s) and contact info

Name: Adeola David Adelakun 

Email: adesdesk@outlook.com


## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the LICENSE.md file for details

### Addresses to a sample organization's deployment of this DApp's contract
#####  (single tranche token release version)
##### 0x47274A4352f24EE341ac04ECfCC0dd6b831D5d0B (double tranche token release version)

