const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const RentalPayment = artifacts.require("RentalPayment");
const fs = require("fs");
const path = require("path");

module.exports = function (deployer) {
  const _renter = process.env.RENTER_ADDRESS;
  const _owner = process.env.OWNER_ADDRESS;
  const rentAmountInETH = process.env.RENT_AMOUNT;
  const _rentAmount = web3.utils.toWei(rentAmountInETH, "ether");

  deployer.deploy(RentalPayment, _renter, _owner, _rentAmount)
    .then((rentalPaymentContract) => {
      fs.appendFileSync(
        path.join(__dirname, "../.env"),
        `\nRENTAL_PAYMENT_ADDRESS=${rentalPaymentContract.address}\n`
      );
    });
};