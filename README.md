## Aave Smart Contract Interactions

This is repository interacts with the Aave smart contract on Ethereum. It uses the Hardhat development environment to interact with the Ethereum network.

The code does the following:

Gets the WETH token, which is used to represent ETH as an ERC20 token.
Deposits WETH to the Aave lending pool.
Calculates how much DAI can be borrowed from the lending pool.
Borrows DAI from the lending pool.
Repays the borrowed DAI.


### Prerequisites

  - Node.js v14 or later
  - A Hardhat Ethereum development environment
  - A valid Ethereum account with ETH and DAI for depositing and borrowing respectively

### Installation

  - Clone the repository and navigate to the project directory.
```
git clone https://github.com/marouenebg/defi
cd defi
```

  - Install dependencies
```
npm install
```

  - Create a .env file and add your Ethereum account private key and Infura API key.

PRIVATE_KEY=<your_private_key>
INFURA_API_KEY=<your_infura_api_key>

  - To run the code you can do 
```
npx hardhat run .\scripts\aaveBorrow.js
```


License
This code is licensed under the MIT License.




