#Setting up our payment system for a single instance 

run the following command to install the required packages
```bash npm install```

run the following command to start the server : This will start the server on port 8545 and also starts the migration and deploy the contract on our local blockchain
```bash npm start```

The values of my contract are hard Coded in the 1_downPayment_migration.js file. You can change the values in the file to test the contract with different values.(the rental period is stored in seconds)

run the following command to start monitoring the contract 
```bash npx truffle exec ./scripts/monitorContract.js```

conversion.js is a helper file that contains a conversion function that interacts with an API (https://app.currencyapi.com/) to convert the values from TND to ETH for the contract.
