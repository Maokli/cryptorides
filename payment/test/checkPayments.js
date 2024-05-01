const Web3 = require('web3');

// Connect to the Ethereum network
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

async function getBalance(address) {
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

  console.log(`Balance of ${address}: ${balanceEther} Ether`);
}

// Replace with the address you want to check
getBalance('0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e');
getBalance('0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E');