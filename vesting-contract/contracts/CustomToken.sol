// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    string private _customName;
    string private _customSymbol;

    constructor() ERC20("CompanyToken", "CTK") {
        _mint(msg.sender, 1000000000000000000000000); // Initial supply: 1,000,000 tokens with 18 decimal places
    }

    function mintCustomToken(string memory customName, string memory customSymbol, uint256 totalSupply) external {
        _mint(msg.sender, totalSupply);
        _customName = customName;
        _customSymbol = customSymbol;
    }

    function name() public view override returns (string memory) {
        return _customName;
    }

    function symbol() public view override returns (string memory) {
        return _customSymbol;
    }
}
