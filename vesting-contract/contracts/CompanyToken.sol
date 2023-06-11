// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
    * Creating an ERC20 token contract that the company uses to spin-off their token.
    * It is enabled to handle token transfers and allowances.
    * The organization determines their token name and symbol while also specifying the decimal and total 
      supply that applies when they supply the constructor arguments to deploy the contract for their use.
**/

contract Token {
    string public name; // Token name
    string public symbol; // Token symbol
    uint256 public totalSupply; // Total supply of the token

    mapping(address => uint256) public balanceOf; // Mapping to track balance of each address
    mapping(address => mapping(address => uint256)) public allowance; // Mapping to track the allowed amount to spend by an address on behalf of another address

    event Transfer(address indexed from, address indexed to, uint256 value); // Event emitted when tokens are transferred
    event Approval(address indexed owner, address indexed spender, uint256 value); // Event emitted when the allowance for spending tokens is set

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply; // Assign the total supply to the contract owner
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Your balance is insufficient"); // Check if the sender has enough balance to perform the transfer
        balanceOf[msg.sender] -= _value; // Deduct the transferred amount from the sender's balance
        balanceOf[_to] += _value; // Add the transferred amount to the recipient's balance
        emit Transfer(msg.sender, _to, _value); // Emit the transfer event
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        allowance[msg.sender][_spender] = _value; // Set the allowance for the spender to spend the specified value on behalf of the owner
        emit Approval(msg.sender, _spender, _value); // Emit the approval event
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(balanceOf[_from] >= _value, "Insufficient balance"); // Check if the sender has enough balance to perform the transfer
        require(allowance[_from][msg.sender] >= _value, "Not allowed to spend this amount"); // Check if the spender is allowed to spend the specified value on behalf of the owner
        balanceOf[_from] -= _value; // Deduct the transferred amount from the sender's balance
        balanceOf[_to] += _value; // Add the transferred amount to the recipient's balance
        allowance[_from][msg.sender] -= _value; // Deduct the spent amount from the spender's allowance
        emit Transfer(_from, _to, _value); // Emit the transfer event
        return true;
    }
}

// CompanyToken contract deployed to address: 0x196A4868d590afc7C6DDc6c67bE738DE97aAcd33
// TokenVesting contract deployed to: 0xbf99061e15Fdafc667118554Ff3Bb3aCcE28b1Dc
// Organization contract deployed to: 0x53B6F6397543150b0C1f3c43e208a5dAa2Ee723f