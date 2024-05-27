const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const DownPayment = artifacts.require("DownPayment");
const fs = require("fs");
const path = require("path");

module.exports = function (deployer) {
  const _renter = process.env.RENTER_ADDRESS;
  const _owner = process.env.OWNER_ADDRESS;
  const _rentalPeriod = process.env.RENTAL_PERIOD;
  const downPaymentInETH = process.env.DOWN_PAYMENT_AMOUNT;
  const _downPaymentAmount = web3.utils.toWei(downPaymentInETH, "ether");

  deployer
    .deploy(DownPayment, _renter, _owner, _rentalPeriod, _downPaymentAmount)
    .then((downPaymentContract) => {
      fs.appendFileSync(
        path.join(__dirname, "../.env"),
        `\nDOWN_PAYMENT_ADDRESS=${downPaymentContract.address}\n`
      );
    });
};
