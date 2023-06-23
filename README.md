# Token-Vesting-Schedule
A decentralized application that provides a platform for organizations to create their custom token and corresponding vesting schedule.

## Description

The DApp consists of two smart contracts, one which enables an rganization's admin to spin off their custom ERC20 token contract, and the other which allows them to create custom token vesting plans for 3 categories of stakeholders namely; Community, Validators, and Investors. The same contract can be adopted by a variety of organizations as each has the liberty to create their token, which address is passed to the a token vesting contract that enables them create their vesting plans for the same token.

Adding these categories of stakeholders is implemented using a custom data type, an enum which index can be supplied during function calls to specify appropriate categories to which an address should belong. Organization admins can add stakeholders and their corresponding vesting details. Vested tokens are released to beneficiary addresses in a defined linear release rate (equal installments as specified by the organization admin) for withdrawal as each resulting fragment of the timelock period elapses.

Organizations' admins can whitelist stakeholder addresses to enable them withdraw their released tokens and susch whitelisted addresses can make withdrawals of released tokens, provided they have the address of the contract which is specific to the organization where they belong.

## Getting Started

### Installing

* Clone this repository to get an exact copy of this program on your computer.
* Open the repository folder in your preferred command line interface. Using the terminal in VSCode is a good option.
* Once in the project folder, navigate into the frontend application folder by running the command
```
cd vesting-interface
```

### Executing program

* Ensure that the terminal now points to the vesting-interface folder, then run the following command
```
npm install
```
* When completed, run the command below to spin up the frontend app on your local computer's server.
```
npm start
```
* The app will spring open in your default browser where you will have access to the user interface, connect an ethereum wallet and carry out various transactions.

## Help

* The contracts sub-folder in the vesting-contract folder contains two versions of the token vesting contracts, namely 'TokenVesting.sol' and 'TokenVestingVII.sol'. Particularly, the TokenVestingVII.sol which has an implementation for token release in multiple tranches (installments) was used for integration to the frontend app. The second contract, 'TokenVesting.sol' is only an initial version I created, which released tokens in one tranche after the timelock elapses. This was improved upon in 'TokenVestingVII.sol' such that organization admins can specify the number of installments in which beneficiaries get the vested tokens, spread evenly accross the vesting period.

* Since this DApp is built to support multiple custom contracts deployment, it is important to keep the address of the deployed contract within reach, so that users can use it to initiate interaction with the right contract.

* In case of a misplaced address to a deployment of the smart contract for an organization, the address can be retrieved by checking the deployer's (admin) wallet's transaction history. Look out for the transaction associated with the contract deployment and it should contain the contract address.

* Ensure to lookout for transaction status prompts as these are a major guide to the transaction frlow in using the app. The provide feedback that notify you when a transaction is in progress, successful or declined.

## Authors

Contributor(s) name(s) and contact info

Name: Adeola David Adelakun 

Email: adesdesk@outlook.com


## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the LICENSE.md file for details


## Suggestions for more features implementable on this DApp
* Additional pages, or a robust user dashboard can be added to the frontend app to use the CustomToken contract instance for providing non-admin users (stakeholders) access to more details such as their token balances, token name, token symbol, and a token transfer interface.

* An organization may choose to do a rework of the frontend app such that it already integrates with an instance of their deployed contracts, making it possible for their stakeholders to interact with the Dapp without having to supply the address of their organization's specific contract deployment. This version of the Dapp is implemented such that different organizations can deploy separate contracts using the same platform, and so stakeholders have to input their specific organization's contract address, to streamline their interaction to the relevant contract.

* The token smart contract can also be customized to implement divisibility of the token, based on the decimal value that interests an organization.

* Both contracts can be further customized to suit a wide variety of 'tokenomics' as an organization may dim fit for their tokens and crop of stakeholders.
