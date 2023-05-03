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


const DaiPrice = await getDai() 
const AmounDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / DaiPrice.toNumber())
console.log(`Amount of DAI you can borrow is ${AmounDaiToBorrow}`)
const AmounDaiToBorrowWei = ethers.utils.parseEther(AmounDaiToBorrow.toString())

daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
await borrowDai(daiAddress, lendingPool, AmounDaiToBorrowWei, deployer)

//Repay
await repay(daiAddress, lendingPool, AmounDaiToBorrowWei, deployer)

}




async function repay(daiAddress,lendingPool, AmounDaiToBorrowWei, account) {
    await approveERC20(daiAddress, lendingPool.address, AmounDaiToBorrowWei, account)
    const repaytx = await lendingPool.repay(daiAddress, AmounDaiToBorrowWei,0, account )
    await repaytx.wait(1)
    console.log ("repayed")
    }

async function borrowDai(daiAddress, lendingPool, AmounDaiToBorrowWei, account) {
const borrowtx = await lendingPool.borrow(daiAddress, AmounDaiToBorrowWei, 1, 0, account)
await borrowtx.wait(1)
console.log("You have borrowed")
}

async function  getDai() {
    const DaiEthPriceFeed = await ethers.getContractAt("AggregatorV3Interface", "0x773616E4d11A78F511299002da57A0a94577F1f4")   
    const price = (await DaiEthPriceFeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price.toString()}`)
    return price
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