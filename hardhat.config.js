/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
module.exports = {
defaultNetwork: "hardhat",
  solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.19",
            },
            {
                version: "0.6.12",
            },
        ],
    },
    networks: {
        hardhat: {
                chainId: 31337,
                forking: {
                        url: MAINNET_RPC_URL,
                    },
            },
    },
};
