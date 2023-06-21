// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Interface for a custom token contract
interface CustomTokenInterface {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

// Contract for token vesting
contract TokenVesting {
    address private _admin; // Address of the admin
    CustomTokenInterface private _tokenContract; // Instance of the custom token contract

    // Enum defining different stakeholder categories
    enum StakeholderCategory {Community, Validators, Investors}

    // Struct defining a vesting schedule
    struct VestingSchedule {
        uint256 totalTokens; // Total tokens allocated for the schedule
        uint256 releaseStart; // Start timestamp of the release period
        uint256 releaseEnd; // End timestamp of the release period
        uint256 releasedTokens; // Number of tokens already released
    }

    mapping(address => bool) private _whitelist; // Mapping to store whitelisted addresses
    mapping(address => StakeholderCategory) private _stakeholderCategories; // Mapping to store stakeholder categories for addresses
    mapping(StakeholderCategory => VestingSchedule) private _vestingSchedules; // Mapping to store vesting schedules for stakeholder categories

    // Constructor function
    constructor(address tokenContractAddress) {
        _admin = msg.sender;
        _tokenContract = CustomTokenInterface(tokenContractAddress);
    }

    // Modifier to allow only the admin to call a function
    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only the admin can call this function");
        _;
    }

    // Modifier to allow only whitelisted addresses to call a function
    modifier onlyWhitelisted() {
        require(_whitelist[msg.sender], "Only whitelisted addresses can call this function");
        _;
    }

    // Function to whitelist multiple addresses, can only be called by the admin
    function whitelistAddresses(address[] calldata addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            _whitelist[addresses[i]] = true;
        }
    }

    // Function to create a vesting schedule for a stakeholder category, can only be called by the admin
    function createVestingSchedule(
        StakeholderCategory category,
        uint256 totalTokens,
        uint256 releaseStart,
        uint256 releaseEnd
    ) external onlyAdmin {
        require(totalTokens > 0, "Total tokens must be greater than zero");
        require(releaseStart < releaseEnd, "Invalid release periods");

        _vestingSchedules[category] = VestingSchedule({
            totalTokens: totalTokens,
            releaseStart: releaseStart,
            releaseEnd: releaseEnd,
            releasedTokens: 0
        });
    }

    // Function to set the stakeholder category for an address, can only be called by the admin
    function setCategorizedAddress(address beneficiary, StakeholderCategory category) external onlyAdmin {
        require(beneficiary != address(0), "Invalid beneficiary address");
        _stakeholderCategories[beneficiary] = category;
    }

    // Function to release tokens for the caller, can only be called by whitelisted addresses
    function releaseTokens() external onlyWhitelisted {
        StakeholderCategory category = _stakeholderCategories[msg.sender];
        require(category != StakeholderCategory(0), "No stakeholder category found for the caller");

        VestingSchedule storage schedule = _vestingSchedules[category];
        require(schedule.totalTokens > 0, "No vesting schedule found for the caller");

        uint256 tokensToRelease = calculateTokensToRelease(schedule);
        require(tokensToRelease > 0, "No tokens available for release");

        schedule.releasedTokens += tokensToRelease;
        _tokenContract.transfer(msg.sender, tokensToRelease);
    }

    // Function to calculate the number of tokens to release based on the vesting schedule
    function calculateTokensToRelease(VestingSchedule memory schedule) private view returns (uint256) {
        uint256 currentTimestamp = block.timestamp;
        if (currentTimestamp < schedule.releaseStart) {
            return 0;
        } else if (currentTimestamp >= schedule.releaseEnd) {
            return schedule.totalTokens - schedule.releasedTokens;
        } else {
            uint256 timePassed = currentTimestamp - schedule.releaseStart;
            uint256 totalTime = schedule.releaseEnd - schedule.releaseStart;
            return (schedule.totalTokens * timePassed) / totalTime - schedule.releasedTokens;
        }
    }
}
