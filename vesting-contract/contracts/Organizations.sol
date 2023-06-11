// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
// import "@openzeppelin/contracts/utils/Address.sol";
import "./CompanyToken.sol";
import "./TokenVesting.sol";

/**
    * This contract enables organizations get registered using an updated instance of their own token
    * They get to create their own instance of TokenVesting
    * They also get to add stakeholders and specify their vesting details 
**/

contract Organization {
    // using Address for address;
    // address immutable token;

    // custom data type "Stakeholder" to enable organizations add their stakeholders
    struct Stakeholder {
        uint256 vestingPeriod; // Vesting period for the stakeholder's tokens
        bool isWhitelisted; // Flag indicating if the stakeholder is whitelisted
    }

    Token public token; // Instance of the Token contract
    address public admin; // Address of the contract admin
    mapping(address => Stakeholder) public stakeholders; // Mapping to track the stakeholders of the organization

    // expected events
    event OrganizationRegistered(address indexed organization, address indexed tokenAddress); // Event emitted when the organization is registered
    event StakeholderAdded(address indexed organization, address indexed stakeholder, uint256 vestingPeriod); // Event emitted when a stakeholder is added
    event WhitelistStatusUpdated(address indexed organization, address indexed stakeholder, bool isWhitelisted); // Event emitted when the whitelist status of a stakeholder is updated

    // modifier to ensure only the admin can whitelist a stakeholder
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action"); // Only the admin can perform this action
        _;
    }

    // supply respective oreganization's token address to the constructor so only their own token applies to them
    constructor(address _tokenAddress) {
        token = Token(_tokenAddress); // Create an instance of the Token contract
        admin = msg.sender; // Set the contract creator as the admin
    }

    // function to resgister organizations
    function registerOrganization(address _tokenAddress) external onlyAdmin {
        require(_tokenAddress != address(0), "Invalid token address"); // Check if the token address is valid

        token = Token(_tokenAddress); // Update the token instance

        emit OrganizationRegistered(address(this), _tokenAddress); // Emit the organization registered event
    }

    // function to enable listing of stakeholders
    function addStakeholder(address _stakeholder, uint256 _vestingPeriod) external onlyAdmin {
        require(_stakeholder != address(0), "Invalid stakeholder address"); // Check if the stakeholder address is valid
        require(_vestingPeriod > 0, "Vesting period must be greater than zero"); // Check if the vesting period is greater than zero

        stakeholders[_stakeholder] = Stakeholder(_vestingPeriod, false); // Add the stakeholder to the organization

        emit StakeholderAdded(address(this), _stakeholder, _vestingPeriod); // Emit the stakeholder added event
    }

    // function to whitelist or undo whitelisting of stakeholders
    function updateWhitelistStatus(address _stakeholder, bool _isWhitelisted) external onlyAdmin {
        require(_stakeholder != address(0), "Invalid stakeholder address"); // Check if the stakeholder address is valid

        stakeholders[_stakeholder].isWhitelisted = _isWhitelisted; // Update the whitelist status of the stakeholder

        emit WhitelistStatusUpdated(address(this), _stakeholder, _isWhitelisted); // Emit the whitelist status updated event
    }

    function withdrawTokens() external {
    require(stakeholders[msg.sender].vestingPeriod > 0, "You are not a registered stakeholder"); // Check if the sender is a registered stakeholder

    if (stakeholders[msg.sender].isWhitelisted) {
        TokenVesting tokenVesting = new TokenVesting(address(token)); // Create a new TokenVesting contract
        require(token.transfer(address(tokenVesting), token.balanceOf(address(this))), "Token transfer to TokenVesting contract failed"); // Transfer tokens to the TokenVesting contract
        tokenVesting.createVestingSchedule(msg.sender, token.balanceOf(address(tokenVesting)), block.timestamp + stakeholders[msg.sender].vestingPeriod); // Create a vesting schedule for the stakeholder
    } else {
        require(msg.sender == admin, "Only admin can withdraw tokens for non-whitelisted stakeholders"); // Only the admin can withdraw tokens for non-whitelisted stakeholders
        require(token.transfer(admin, token.balanceOf(address(this))), "Token transfer to admin failed"); // Transfer the tokens to the admin
    }
}

}
