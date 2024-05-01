// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DownPayment {
    address payable public renter;
    address payable public owner;
    uint256 public downPaymentAmount;
    uint256 public endTime;
    bool public renterApproved = false;
    bool public downPaymentMade = false;
    bool public downPaymentReturned = false;

    modifier onlyRenter() {
        require(msg.sender == renter, "Only the renter can call this function");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function renterApprove() public onlyRenter {
        renterApproved = true;
    }
    event EndTimeSet(uint256 endTime);

    constructor(
        address payable _renter,
        address payable _owner,
        uint256 _rentalPeriod,
        uint256 _downPaymentAmount
    ) {
        require(
            _renter != address(0) && _owner != address(0),
            "Invalid addresses"
        );

        renter = _renter;
        owner = _owner;
        downPaymentAmount = _downPaymentAmount;
        endTime = block.timestamp + _rentalPeriod;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getEndTime() public view returns (uint256) {
        return endTime;
    }

    function payDownPayment() public payable onlyRenter {
        require(!downPaymentMade, "Down payment already made");
        require(
            msg.value == downPaymentAmount,
            "Must pay the exact down payment amount"
        );
        downPaymentMade = true;
    }

    function returnDownPayment(uint256 currentDate) public onlyRenter {
        require(
            currentDate >= endTime,
            "Cannot return the down payment before the end of the rental period"
        );
        require(downPaymentMade, "Down payment not yet made");
        require(!downPaymentReturned, "Down payment already returned");
        downPaymentReturned = true;
        renter.transfer(address(this).balance);
    }

    function claimDownPayment() public onlyOwner {
        require(downPaymentMade, "Down payment not yet made");
        require(!downPaymentReturned, "Down payment already returned");
        require(renterApproved, "Renter has not approved");
        downPaymentReturned = true;
        owner.transfer(address(this).balance);
    }

    function getRenter() public view returns (address payable) {
        
        return renter;
    }
    
    function getOwner() public view returns (address payable) {
        return owner;
    }
    
    function getDownPaymentAmount() public view returns (uint256) {
        return downPaymentAmount;
    }
}
