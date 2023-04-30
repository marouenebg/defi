//aave consider everything as an ERC20 token
//but ETH in itself is not an ERC20 token, we should use WETH which is Eth but in a format of an ERC20 token
const {getWeth} = require ("../scripts/getWeth")
async function main() {
await getWeth()
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })