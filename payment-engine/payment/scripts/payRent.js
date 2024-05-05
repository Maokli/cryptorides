const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function payRent(contractAddress, artifacts) {
  // Get the contract instance to pay the rent
  const rentalPayment = artifacts.require("RentalPayment");
  const contract = await rentalPayment.at(contractAddress);

  // Get the renter, owner and the rent amount
  const renter = await contract.getRenter();
  const owner = await contract.getOwner();
  const rentValue = await contract.getRentAmount();
  
  // Pay the rent amount
  const paymentTx = await contract.payRent({
    from: renter,
    value: rentValue,
  });
  console.log("Rent paid");
  //withdraw the rent amount
  await contract.withdrawRent({ from: owner });
  console.log("Rent withdrawn");
  // Return the transaction
  return paymentTx;
}
module.exports = payRent;
