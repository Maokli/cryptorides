const DownPayment = artifacts.require("DownPayment");

module.exports = function(deployer) {
  const _renter = "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e";
  const _owner = "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E";
  const _rentalPeriod = 60; 
  const _downPaymentAmount = web3.utils.toWei("1", "ether"); // adjust as needed

  deployer.deploy(DownPayment, _renter, _owner, _rentalPeriod, _downPaymentAmount);
  
};