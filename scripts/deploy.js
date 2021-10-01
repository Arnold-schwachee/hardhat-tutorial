
// To indicate Hardhat to connect to a specific Ethereum network when running
// any tasks, you can use the --network parameter. Like this:
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token address: ", token.address);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})

// For  Hardhat Network
// npx hardhat run scripts/deploy.js

// see for kovan or mainet https://hardhat.org/tutorial/deploying-to-a-live-network.html
