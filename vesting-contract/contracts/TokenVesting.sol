// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./CompanyToken.sol";

/**
    * This contract enables admin istration of various vesting schedules that apply to an organization's token
    * It also cosists of the function to make vested token available to the beneficiary stakeholder when vesting period elapses 
**/

contract TokenVesting {
    // custom data type for specifying respective vesting schedules
    struct VestingSchedule {
        uint256 amount; // Amount of tokens to be released
        uint256 releaseTime; // Time when the tokens can be released
    }

    mapping(address => VestingSchedule[]) public vestingSchedules; // Mapping to track the vesting schedules of each address
    mapping(address => uint256) public totalVestedTokens; // Mapping to track the total vested tokens of each address

    Token public token; // Instance of the Token contract
    address public admin; // Address of the contract admin

    event VestingScheduleCreated(address indexed beneficiary, uint256 amount, uint256 releaseTime); // Event emitted when a vesting schedule is created
    event TokensReleased(address indexed beneficiary, uint256 amount); // Event emitted when tokens are released from a vesting schedule

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action"); // Only the admin can perform this action
        _;
    }

    constructor(address _tokenAddress) {
        token = Token(_tokenAddress); // Create an instance of the Token contract
        admin = msg.sender; // Set the contract creator as the admin
    }

    // Admin to create vesting schedule corresponding to each stakeholder
    function createVestingSchedule(address _beneficiary, uint256 _amount, uint256 _releaseTime) external onlyAdmin {
        require(_beneficiary != address(0), "Invalid beneficiary address"); // Check if the beneficiary address is valid
        require(_amount > 0, "Amount must be greater than zero"); // Check if the amount is greater than zero
        require(_releaseTime > block.timestamp, "Release time must be in the future"); // Check if the release time is in the future

        VestingSchedule memory schedule = VestingSchedule(_amount, _releaseTime); // Create a new vesting schedule
        vestingSchedules[_beneficiary].push(schedule); // Add the vesting schedule to the beneficiary's list of schedules
        totalVestedTokens[_beneficiary] += _amount; // Update the total vested tokens for the beneficiary

        emit VestingScheduleCreated(_beneficiary, _amount, _releaseTime); // Emit the vesting schedule created event
    }

    // make vested token available to the beneficiary stakeholder when vesting period elapses
    function releaseTokens() external {
    uint256 totalReleasedTokens = 0; // Track the total released tokens
    VestingSchedule[] storage schedules = vestingSchedules[msg.sender]; // Get the vesting schedules of the sender

    for (uint256 i = 0; i < schedules.length; i++) {
        if (block.timestamp >= schedules[i].releaseTime) { // Check if the release time for the schedule has passed
            uint256 amount = schedules[i].amount; // Get the amount of tokens to be released
            schedules[i].amount = 0; // Set the amount to zero to mark it as released
            totalReleasedTokens += amount; // Add the released amount to the total released tokens
            emit TokensReleased(msg.sender, amount); // Emit the tokens released event
        }
    }

    require(totalReleasedTokens > 0, "No tokens available for release"); // Check if there are tokens available for release
    require(token.balanceOf(address(this)) >= totalReleasedTokens, "Not enough tokens in the contract"); // Check if the contract has enough tokens

    require(token.transfer(msg.sender, totalReleasedTokens), "Token transfer failed"); // Transfer the released tokens to the sender
}

}
