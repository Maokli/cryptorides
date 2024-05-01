const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

async function renterPayment(contractAddress, artifacts) {
    // Get the contract instance to pay the down payment
  const DownPayment = artifacts.require("DownPayment");
  const contract = await DownPayment.at(contractAddress);

  // Get the renter and the down payment amount
  const renter = await contract.getRenter();
  const downPaymentValue = await contract.getDownPaymentAmount();

  // Pay the down payment
  const tx = await contract.payDownPayment({
    from: renter,
    value: downPaymentValue,
  });
  
  // Return the transaction
  return tx;
}
module.exports = renterPayment;
