const dotenv = require("dotenv");
dotenv.configDotenv({ path: "../.env" });

const payDownPayment = require("./payDownPayment");
const payRent = require("./payRent");

module.exports = async (callback) => {
  try {
    const BN = web3.utils.BN;
    //Get the contract instance to monitor
    const downPaymentAddress = process.env.DOWN_PAYMENT_ADDRESS;
    const rentalPaymentAddress = process.env.RENTAL_PAYMENT_ADDRESS;
    const DownPayment = artifacts.require("DownPayment");
    const downPaymentInstance = await DownPayment.at(downPaymentAddress);

    //pay down payment
    const tx = await payDownPayment(downPaymentAddress, artifacts);

    //rent transaction
    const rentTx = await payRent(rentalPaymentAddress, artifacts);
    
    //monitor the contract
    const endTime = (await downPaymentInstance.getEndTime());
    const currentTime =new BN(Math.floor(Date.now() / 1000));
    const delayS = endTime.sub(currentTime).toNumber();
    const delayMs = delayS * 1000 + 5;
    const renter = await downPaymentInstance.getRenter();

    console.log("Monitoring contract for ", delayS, "seconds");
    
    setTimeout(async () => {
        try {
            const updatedTime = new BN(Math.floor(Date.now() / 1000));
            await downPaymentInstance.returnDownPayment(updatedTime,{from: renter});
            console.log("Down payment returned");
            return(true)
        } catch (error) {
            console.log("Error sending payment");
            console.error(error);
            return(false);
      }}, delayMs);
           
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
