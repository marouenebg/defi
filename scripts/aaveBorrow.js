//aave consider everything as an ERC20 token
//but ETH in itself is not an ERC20 token, we should use WETH which is Eth but in a format of an ERC20 token
const { getNamedAccounts } = require("hardhat")
const {getWeth} = require ("../scripts/getWeth")
const { ethers } = require("hardhat")
async function main() {
await getWeth()
const {deployer} = await getNamedAccounts()
//Lending pool address provider : 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
}
async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account)

    const lendingPoolAdress = await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAdress,
        )

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })