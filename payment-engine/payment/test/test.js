const DownPayment = artifacts.require("DownPayment");

contract("DownPayment", accounts => {
  it("should return the correct renter", async () => {
    const downPaymentInstance = await DownPayment.deployed();

    // Assuming the renter is the first account
    const expectedRenter = accounts[9];

    const renter = await downPaymentInstance.getRenter();
    
    console.log("Renter: ", renter);

    assert.equal(renter, expectedRenter, "The renter returned by getRenter is incorrect");
  });
});