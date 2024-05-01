// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalPayment {
    address payable public owner;
    address public renter;
    uint256 public rentAmount;

    constructor(address _renter, uint256 _rentAmount) {
        require(_renter != address(0), "Invalid renter address");
        require(_rentAmount > 0, "Invalid rent amount");

        owner = payable(msg.sender);
        renter = _renter;
        rentAmount = _rentAmount;
    }

    modifier onlyRenter() {
        require(msg.sender == renter, "Only the renter can call this function");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    function payRent() external payable onlyRenter {
        require(msg.sender == renter, "Only the renter can pay rent");
        require(msg.value == rentAmount, "Must pay the correct rent amount");
    }

    function withdrawRent() external onlyOwner {
        require(msg.sender == owner, "Only the owner can withdraw rent");
        owner.transfer(address(this).balance);
    }
}