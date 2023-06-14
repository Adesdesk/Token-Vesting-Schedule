// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Import the CustomToken contract
import "./CustomToken.sol";

contract VestingContract {
    // Address of the CustomToken contract
    address private customTokenAddress;

    // Mapping to store vesting schedules for each address and category
    mapping(address => mapping(string => VestingSchedule[])) private vestingSchedules;

    // Mapping to store categories of stakeholders
    mapping(string => bool) private allowedCategories;

    // Event emitted when a new vesting schedule is created
    event VestingScheduleCreated(
        address indexed beneficiary,
        string indexed category,
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
     * @dev Modifier to ensure that only the admin can perform certain actions.
     */
    modifier onlyAdmin() {
        require(msg.sender == customTokenAddress, "Only admin can perform this action");
        _;
    }

    /**
     * @dev Allows the admin to add a category of stakeholders.
     * @param category The category of stakeholders to be added.
     */
    function addStakeholderCategory(string memory category) external onlyAdmin {
        require(!allowedCategories[category], "Category already exists");
        allowedCategories[category] = true;
    }

    /**
     * @dev Allows the admin to create a vesting schedule for a stakeholder in a specific category.
     * @param beneficiary The address of the stakeholder.
     * @param amount The amount of tokens to vest.
     * @param vestingPeriod The duration of the vesting period in seconds.
     * @param category The category of stakeholders.
     */
    function createVestingSchedule(
        address beneficiary,
        uint256 amount,
        uint256 vestingPeriod,
        string memory category
    ) external onlyAdmin {
        require(amount > 0, "Amount must be greater than zero");
        require(vestingPeriod > 0, "Vesting period must be greater than zero");
        require(allowedCategories[category], "Invalid category");

        VestingSchedule memory schedule = VestingSchedule(amount, vestingPeriod, block.timestamp);
        vestingSchedules[beneficiary][category].push(schedule);

        emit VestingScheduleCreated(beneficiary, category, amount, vestingPeriod);
    }

    /**
     * @dev Allows a whitelisted address to claim their vested tokens for a specific category.
     * @param category The category of stakeholders.
     */
    function claimVestedTokens(string memory category) external {
        require(allowedCategories[category], "Invalid category");

        VestingSchedule[] storage schedules = vestingSchedules[msg.sender][category];

        for (uint256 i = 0; i < schedules.length; i++) {
            uint256 vestedAmount = calculateVestedAmount(schedules[i]);
            if (vestedAmount > 0) {
                IERC20(customTokenAddress).transfer(msg.sender, vestedAmount);
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
