const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {

    // A Signer in ethers.js is an object that represents an Ethereum account.
    // It's used to send transactions to contracts and other accounts.
    // Here we're getting a list of the accounts in the node we're connected to,
    // which in this case is Hardhat Network, and only keeping the first one.
    const [owner] = await ethers.getSigners();

    // A ContractFactory in ethers.js is an abstraction used to deploy
    // new smart contracts, so Token here is a factory for
    // instances of our token contract.
    const Token = await ethers.getContractFactory("Token");

    // Calling deploy() on a ContractFactory will start the deployment,
    // and return a Promise that resolves to a Contract.
    // This is the object that has a method for each of your smart contract functions.
    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  })
})


describe("Transactions", function () {
  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
});
