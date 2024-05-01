const renterPayment = require("./renterPayment");
module.exports = async (callback) => {
  try {
    //Get the contract instance to monitor
    const contractAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
    const DownPayment = artifacts.require("DownPayment");
    const downPaymentInstance = await DownPayment.at(contractAddress);

    //pay down payment
    const tx = await renterPayment(contractAddress, artifacts);

    //monitor the contract
    const endTime = await downPaymentInstance.getEndTime();
    const currentTime = Math.floor(Date.now() / 1000);

    const delayS = endTime - currentTime;
    const delayMs = delayS*1000;

    const renter = await downPaymentInstance.getRenter();

    setTimeout(async () => {
        try {
            await downPaymentInstance.returnDownPayment({from: renter});
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
