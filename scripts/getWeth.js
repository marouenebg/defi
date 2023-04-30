const { getNamedAccounts, ethers } = require("hardhat")

async function getWeth() {

const AMOUNT = ethers.utils.parseEther("0.1")
//In order to interact with a contract, we need an account
const { deployer } = await getNamedAccounts()
//call the deposit function on the WETH contract
/* we need the 
    abi, 
    contract address ==> 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
*/ 
const IWeth = await ethers.getContractAt("IWeth", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", deployer)
const tx = await IWeth.deposit({value: AMOUNT})
//await 1 block to go through
await tx.wait(1)

const WethBalance = IWeth.balanceOf(deployer)   
console.log(`got {$WethBalance.toString()} WETH`)
}

module.exports = {getWeth}
