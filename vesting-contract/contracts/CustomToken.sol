// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CustomToken {
    string private _name; // Name of the token
    string private _symbol; // Symbol of the token
    uint256 private _totalSupply; // Total supply of the token

    mapping(address => uint256) private _balances; // Mapping to store token balances of addresses

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
        _balances[msg.sender] = totalSupply_; // Assign the total supply to the contract deployer's balance
    }

    // Function to get the name of the token
    function name() public view returns (string memory) {
        return _name;
    }

    // Function to get the symbol of the token
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    // Function to get the total supply of the token
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Function to get the balance of a specific account
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    // Function to transfer tokens from the sender to a recipient
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _balances[msg.sender] -= amount; // Deduct the amount from the sender's balance
        _balances[recipient] += amount; // Add the amount to the recipient's balance

        return true;
    }
}
