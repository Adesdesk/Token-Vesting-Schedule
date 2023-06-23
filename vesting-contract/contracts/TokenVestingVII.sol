// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './CustomToken.sol';

contract TokenVestingVII {
    address private _admin; // Address of the admin
    CustomToken private _tokenContract; // An instance of the CustomToken contract

    // An enum defining different stakeholder categories
    enum StakeholderCategory {Community, Validators, Investors}

    // A struct providing framework for creating vesting schedules
    struct VestingSchedule {
        uint256 totalTokens; // Total tokens allocated for the schedule
        uint256 releaseStart; // Start timestamp of the release period
        uint256 releaseEnd; // End timestamp of the release period
        uint256 releasedTokens; // Number of tokens already released
        uint256 numberOfInstallments; // Number of installments for releasing the tokens
    }


    mapping(address => bool) private _whitelist; // Mapping to store whitelisted addresses
    mapping(address => StakeholderCategory) private _stakeholderCategories; // Mapping to store stakeholder categories for addresses
    mapping(StakeholderCategory => VestingSchedule) private _vestingSchedules; // Mapping to store vesting schedules for stakeholder categories

    // Constructor function
    constructor(address tokenContractAddress) {
        _admin = msg.sender;
        _tokenContract = CustomToken(tokenContractAddress);
    }

    // Modifier to allow only the admin to call restricted function(s)
    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only the admin can perform this transaction");
        _;
    }

    // Modifier to allow only whitelisted addresses to perform specific transaction(s)
    modifier onlyWhitelisted() {
        require(_whitelist[msg.sender], "Only whitelisted addresses can perform this transaction");
        _;
    }

    // Function to whitelist multiple addresses, can only be called by the admin
    function whitelistAddresses(address[] calldata addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            _whitelist[addresses[i]] = true;
        }
    }

    // Function to create a vesting schedule for any stakeholder category. (Can only be called by the admin)
    function createVestingSchedule(
        StakeholderCategory category,
        uint256 totalTokens,
        uint256 releaseStart,
        uint256 releaseEnd,
        uint256 numberOfInstallments
    ) external onlyAdmin {
        require(totalTokens > 0, "Tokens must be greater than zero");
        require(releaseStart < releaseEnd, "Release period must be in the future");
        require(numberOfInstallments > 0, "Number of installments must be greater than zero");

        _vestingSchedules[category] = VestingSchedule({
            totalTokens: totalTokens,
            releaseStart: releaseStart,
            releaseEnd: releaseEnd,
            releasedTokens: 0,
            numberOfInstallments: numberOfInstallments
        });
    }


    // Function to set the stakeholder category for an address. (Can only be called by the admin)
    function setCategorizedAddress(address beneficiary, StakeholderCategory category) external onlyAdmin {
        require(beneficiary != address(0), "Invalid beneficiary address");
        _stakeholderCategories[beneficiary] = category;
    }


    // Function to release tokens for the caller. (Can only be called by whitelisted addresses)
    function releaseTokens() external onlyWhitelisted {
        StakeholderCategory category = _stakeholderCategories[msg.sender];
        require(category != StakeholderCategory(0), "No stakeholder category found for this caller");

        VestingSchedule storage schedule = _vestingSchedules[category];
        require(schedule.totalTokens > 0, "No vesting schedule found for this caller");

        uint256 tokensToRelease = calculateTokensToRelease(schedule);
        require(tokensToRelease > 0, "No tokens available for release");

        schedule.releasedTokens += tokensToRelease;
        _tokenContract.transfer(msg.sender, tokensToRelease);
    }

    // Function to calculate the number of tokens to release based on set vesting schedule
    function calculateTokensToRelease(VestingSchedule memory schedule) private view returns (uint256) {
        uint256 currentTimestamp = block.timestamp;
        if (currentTimestamp < schedule.releaseStart) {
            return 0;
        } else if (currentTimestamp >= schedule.releaseEnd) {
            return schedule.totalTokens - schedule.releasedTokens;
        } else {
            uint256 timePassed = currentTimestamp - schedule.releaseStart;
            uint256 totalTime = schedule.releaseEnd - schedule.releaseStart;
            uint256 installmentTokens = schedule.totalTokens / schedule.numberOfInstallments;
            uint256 installmentsPassed = (timePassed * schedule.numberOfInstallments) / totalTime;
            uint256 tokensToRelease = installmentsPassed * installmentTokens - schedule.releasedTokens;
            return tokensToRelease;
        }
    }
}