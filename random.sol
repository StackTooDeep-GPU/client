// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedGPUSharing {

    address public owner;

    enum GPUStatus { Idle, InUse, Disabled }
    enum State {Active, Fullfilled}

    struct GPU {
        string ipAddress;
        uint256 ratePerMinute;
        GPUStatus status;
        address provider;
    }

    struct Transaction {
        GPU gpuInstance;
        address user;
        uint256 allocationTimestamp;
        uint256 deallocationTimestamp;
        State status;
    }

    mapping(address => GPU) public providedGPUInstances;
    mapping (address => Transaction) public allocatedGPUInstances;
    uint256 public totalGPUInstances;

    event GPUAllocated(address indexed user, uint256 allocationTimestamp);
    event GPUReleased(address indexed user, uint256 deallocationTimestamp);
    event GPUDisabled(address indexed provider);
    event GPUAdded(address indexed provider, string ipAddress, uint256 ratePerMinute);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyGPUOwner() {
        require(providedGPUInstances[msg.sender].provider == msg.sender, "Not the GPU owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addGPUInstance(string calldata ipAddress, uint256 ratePerMinute) external{
        providedGPUInstances[msg.sender] = GPU({
            ipAddress: ipAddress,
            ratePerMinute: ratePerMinute,
            status: GPUStatus.Idle,
            provider: msg.sender
        });
        totalGPUInstances++;
        emit GPUAdded(msg.sender, ipAddress, ratePerMinute);
    }

    function allocateGPU(address provider) external{
        require(providedGPUInstances[provider].status == GPUStatus.Idle, "GPU is not available");
        allocatedGPUInstances[msg.sender] = Transaction({
            gpuInstance : providedGPUInstances[provider],
            user: msg.sender,
            allocationTimestamp: block.timestamp,
            deallocationTimestamp: 0,
            status: State.Active
        });
        emit GPUAllocated(msg.sender, allocatedGPUInstances[msg.sender].allocationTimestamp);
    }

    function releaseGPU() external {
        require(allocatedGPUInstances[msg.sender].status == State.Active, "GPU is not in use");

        allocatedGPUInstances[msg.sender].deallocationTimestamp = block.timestamp;
        allocatedGPUInstances[msg.sender].status = State.Fullfilled;
        providedGPUInstances[msg.sender].status = GPUStatus.Idle;

        uint256 totalTimeUsed = allocatedGPUInstances[msg.sender].deallocationTimestamp - allocatedGPUInstances[msg.sender].allocationTimestamp;
        uint256 totalCost = (totalTimeUsed / 60) * allocatedGPUInstances[msg.sender].gpuInstance.ratePerMinute;

        // Transfer funds to the GPU provider

        emit GPUReleased(msg.sender, allocatedGPUInstances[msg.sender].deallocationTimestamp);
    }

    function disableGPU() external{
        require(providedGPUInstances[msg.sender].status != GPUStatus.Disabled, "GPU is already disabled");
        providedGPUInstances[msg.sender].status = GPUStatus.Disabled;
        emit GPUDisabled(msg.sender);
    }

    function enableGPU() external{
        require(providedGPUInstances[msg.sender].status == GPUStatus.Disabled, "GPU is not disabled");
        providedGPUInstances[msg.sender].status = GPUStatus.Idle;
    }
}