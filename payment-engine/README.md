#Setting up our payment system for a single instance 

install docker (visit the official website)

install flask 

``pip install flask``

install currencyapicom

``pip install currencyapicom``

pull the truffle/ganache image from docker hub

``docker pull trufflesuite/ganache``

create a docker network 
    
``docker network create payment-network``

run the image

``docker run -d --network payment-network --name ganache -p 8545:8545 trufflesuite/ganache -d -i 123456`` 

we have our own containarized ganache instance running on port 8545

get inside the payment folder and run :

``docker build -t payment-instance . ``

start the server 

``python3 api.py``

send a request and there you go you deployed your own contract !!! 

PS : create a .env file in the payment folder its necessary and get the API key from https://currencyapi.net/ and put it in the .env file as API_KEY=your_api_key (it must be in the same folder as the api.py file)