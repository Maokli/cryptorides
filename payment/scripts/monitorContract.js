const payDownPayment = require("./payDownPayment");
const payRent = require("./payRent");

module.exports = async (callback) => {
  try {
    const BN = web3.utils.BN;
    //Get the contract instance to monitor
    const downPaymentAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
    const DownPayment = artifacts.require("DownPayment");
    const downPaymentInstance = await DownPayment.at(downPaymentAddress);
    const rentAddress = "0x5b1869D9A4C187F2EAa108f3062412ecf0526b24"

    //pay down payment
    const tx = await payDownPayment(downPaymentAddress, artifacts);

    //rent transaction
    const rentTx = await payRent(rentAddress, artifacts);
    
    //monitor the contract
    const endTime = (await downPaymentInstance.getEndTime());
    const currentTime =new BN(Math.floor(Date.now() / 1000));

    const delayS = endTime.sub(currentTime).toNumber();
    const delayMs = delayS * 1000 + 5;

    const renter = await downPaymentInstance.getRenter();
    setTimeout(async () => {
        try {
            const updatedTime = new BN(Math.floor(Date.now() / 1000));
            await downPaymentInstance.returnDownPayment(updatedTime,{from: renter});
            console.log("Down payment returned");
        } catch (error) {
            console.log("Error sending payment");
            console.error(error);
      }}, delayMs);
      callback();      
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
