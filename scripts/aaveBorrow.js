//aave consider everything as an ERC20 token
//but ETH in itself is not an ERC20 token, we should use WETH which is Eth but in a format of an ERC20 token
const { getNamedAccounts } = require("hardhat")
const {getWeth, AMOUNT} = require ("../scripts/getWeth")
const { ethers } = require("hardhat")
async function main() {
await getWeth()
const {deployer} = await getNamedAccounts()
//Lending pool address provider : 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
const lendingPool = await getLendingPool(deployer)
console.log(`Lending Pool address ${lendingPool.address}`)

//Deposit
// with safetransfer from, we need to approve the contract to transfer
const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
await approveERC20(wethTokenAddress,lendingPoolAdress ,AMOUNT , deployer)
console.log(depositing)
await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)






//Borrow
//how much can we borrow 
let {availableBorrowsETH, totalDebtETH} = await getBorrowUserData(lendingPool, deployer)

}


async function getBorrowUserData(lendingPool, account) {
    const {totalCollateralETH, totalDebtETH, availableBorrowsETH}  = await lendingPool.getUserAccountData(account)   
    console.log(`You have ${totalCollateralETH} worth of eth`)
    console.log(`You have ${totalDebtETH} worth of eth brorrowed`)
    console.log(`You can borrow ${availableBorrowsETH} worth of eth`)
    return {availableBorrowsETH, totalDebtETH}
}


async function approveERC20(erc20Address, spenderAddress, amountTospend, account) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountTospend)
    await tx.await (1)

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

return lendingPool

}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })