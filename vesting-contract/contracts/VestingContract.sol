// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Import the CustomToken contract
import "./CustomToken.sol";

contract VestingContract {
    // Address of the CustomToken contract
    address private customTokenAddress;

    // Mapping to store vesting schedules for each address
    mapping(address => VestingSchedule[]) public vestingSchedules;

    // Event emitted when a new vesting schedule is created
    event VestingScheduleCreated(
        address indexed beneficiary,
        uint256 amount,
        uint256 vestingPeriod
    );

    // Struct to represent a vesting schedule
    struct VestingSchedule {
        uint256 amount;
        uint256 vestingPeriod;
        uint256 startTime;
    }

    constructor(address _customTokenAddress) {
        customTokenAddress = _customTokenAddress;
    }

    /**
     * @dev Allows a user to create a vesting schedule for their own tokens.
     * @param amount The amount of tokens to vest.
     * @param vestingPeriod The duration of the vesting period in seconds.
     */
    function createVestingSchedule(uint256 amount, uint256 vestingPeriod) external {
        require(amount > 0, "Amount must be greater than zero");
        require(vestingPeriod > 0, "Vesting period must be greater than zero");

        VestingSchedule memory schedule = VestingSchedule(amount, vestingPeriod, block.timestamp);
        vestingSchedules[msg.sender].push(schedule);

        emit VestingScheduleCreated(msg.sender, amount, vestingPeriod);
    }

    /**
     * @dev Allows a whitelisted address to claim their vested tokens.
     */
    function claimVestedTokens() external {
        VestingSchedule[] storage schedules = vestingSchedules[msg.sender];

        for (uint256 i = 0; i < schedules.length; i++) {
            uint256 vestedAmount = calculateVestedAmount(schedules[i]);
            if (vestedAmount > 0) {
                ERC20(customTokenAddress).transfer(msg.sender, vestedAmount);
            }
        }
    }

    /**
     * @dev Calculates the amount of tokens vested based on the vesting schedule.
     * @param schedule The vesting schedule.
     * @return The amount of vested tokens.
     */
    function calculateVestedAmount(VestingSchedule memory schedule) internal view returns (uint256) {
        uint256 elapsedTime = block.timestamp - schedule.startTime;

        if (elapsedTime >= schedule.vestingPeriod) {
            return schedule.amount;
        } else {
            return (schedule.amount * elapsedTime) / schedule.vestingPeriod;
        }
    }
}
