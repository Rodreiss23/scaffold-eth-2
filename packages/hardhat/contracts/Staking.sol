//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {REPToken} from "./REPToken.sol";

/**
 * @title Native token staking with REP rewards
 * @notice Users stake native coin (e.g., TRUST) and earn REP at a fixed rate per second.
 */
contract Staking is Ownable, ReentrancyGuard {
    REPToken public immutable repToken;

    // rewardRateScaled: REP per second per 1 ETH staked, scaled by 1e18
    uint256 public rewardRateScaled;

    struct UserInfo {
        uint256 staked; // amount of native token staked (wei)
        uint256 rewardsAccrued; // unclaimed REP (wei)
        uint256 lastUpdate; // timestamp
    }

    mapping(address => UserInfo) public users;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 rewardRateScaled);

    constructor(address _owner, REPToken _repToken, uint256 _rewardRateScaled) Ownable(_owner) {
        require(address(_repToken) != address(0), "rep token");
        repToken = _repToken;
        rewardRateScaled = _rewardRateScaled;
        emit RewardRateUpdated(_rewardRateScaled);
    }

    receive() external payable {
        _stake(msg.sender, msg.value);
    }

    function stake() external payable nonReentrant {
        require(msg.value > 0, "no value");
        _stake(msg.sender, msg.value);
    }

    function _stake(address user, uint256 amount) internal {
        _updateRewards(user);
        users[user].staked += amount;
        totalStaked += amount;
        emit Staked(user, amount);
    }

    function withdraw(uint256 amount) external nonReentrant {
        _withdraw(msg.sender, amount);
    }

    function _withdraw(address user, uint256 amount) internal {
        require(amount > 0, "amount");
        UserInfo storage u = users[user];
        require(u.staked >= amount, "exceeds");
        _updateRewards(user);
        u.staked -= amount;
        totalStaked -= amount;
        (bool ok, ) = user.call{value: amount}("");
        require(ok, "send fail");
        emit Withdrawn(user, amount);
    }

    function claimRewards() public nonReentrant {
        _claimRewards(msg.sender);
    }

    function _claimRewards(address user) internal {
        _updateRewards(user);
        uint256 rewards = users[user].rewardsAccrued;
        require(rewards > 0, "no rewards");
        users[user].rewardsAccrued = 0;
        repToken.mint(user, rewards);
        emit RewardsClaimed(user, rewards);
    }

    function exit() external nonReentrant {
        uint256 amount = users[msg.sender].staked;
        if (amount > 0) {
            _withdraw(msg.sender, amount);
        }
        if (users[msg.sender].rewardsAccrued > 0) {
            _claimRewards(msg.sender);
        }
    }

    function pendingRewards(address user) external view returns (uint256) {
        UserInfo memory u = users[user];
        uint256 accrued = u.rewardsAccrued;
        if (u.staked > 0) {
            uint256 delta = block.timestamp - u.lastUpdate;
            accrued += (u.staked * rewardRateScaled * delta) / 1e18;
        }
        return accrued;
    }

    function setRewardRate(uint256 _rewardRateScaled) external onlyOwner {
        rewardRateScaled = _rewardRateScaled;
        emit RewardRateUpdated(_rewardRateScaled);
    }

    function _updateRewards(address user) internal {
        UserInfo storage u = users[user];
        if (u.lastUpdate != 0 && u.staked > 0) {
            uint256 delta = block.timestamp - u.lastUpdate;
            u.rewardsAccrued += (u.staked * rewardRateScaled * delta) / 1e18;
        }
        u.lastUpdate = block.timestamp;
    }
}