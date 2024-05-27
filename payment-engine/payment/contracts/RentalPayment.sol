// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalPayment {
    address payable public owner;
    address public renter;
    uint256 public rentAmount;
    bool public isRentPaid = false;


    constructor(address _renter, address payable _owner, uint256 _rentAmount) {
        require(_renter != address(0), "Invalid renter address");
        require(_owner != address(0), "Invalid owner address");
        require(_rentAmount > 0, "Invalid rent amount");

        owner = _owner;
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

    function getRenter() public view returns (address) {
        return renter;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getRentAmount() public view returns (uint256) {
        return rentAmount;
    }
    function payRent() public payable onlyRenter {
        require(msg.sender == renter, "Only the renter can pay rent");
        require(msg.value == rentAmount, "Must pay the correct rent amount");
        require(!isRentPaid, "Rent has already been paid");
    }

    function withdrawRent() public onlyOwner {
        require(msg.sender == owner, "Only the owner can withdraw rent");
        owner.transfer(address(this).balance);
    }
}
