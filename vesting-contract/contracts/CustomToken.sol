// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CustomToken {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
        _balances[msg.sender] = totalSupply_;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;

        return true;
    }
}
