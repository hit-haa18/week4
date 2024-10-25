const { ethers } = require("hardhat");
const { expect } = require("chai");
const hre = require("hardhat");

describe("MyNFT", function () {
  const tokenURI = "https://my-nft";

  async function deployNFT() {
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const [owner] = await hre.ethers.getSigners();
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
    return { myNFT, owner };
  }

  it("Should mint an NFT", async function () {
    const { myNFT, owner } = await deployNFT();
    const tx = await myNFT.mintNFT(owner.address, tokenURI);
    await tx.wait(); // Wait for transaction to be mined
    expect(await myNFT.ownerOf(1)).to.equal(owner.address);
  });

  it("Should return the token URI", async function () {
    const { myNFT, owner } = await deployNFT();
    const tx = await myNFT.mintNFT(owner.address, tokenURI);
    await tx.wait();
    expect(await myNFT.tokenURI(1)).to.equal(tokenURI);
  });

  it("Should return the new Item ID", async function () {
    const { myNFT, owner } = await deployNFT();
    const tx = await myNFT.mintNFT(owner.address, tokenURI);
    await tx.wait();
    const tokenId = await tx.wait(); // Get the transaction receipt
    expect(tokenId.status).to.equal(1);
  });

  it("Should track token IDs correctly", async function () {
    const { myNFT, owner } = await deployNFT();
    const tx1 = await myNFT.mintNFT(owner.address, tokenURI);
    await tx1.wait();
    expect(await myNFT.balanceOf(owner.address)).to.equal(1n);

    const tx2 = await myNFT.mintNFT(owner.address, tokenURI);
    await tx2.wait();
    expect(await myNFT.balanceOf(owner.address)).to.equal(2n);
  });

  it("Should return the balance of", async function () {
    const { myNFT, owner } = await deployNFT();
    const tx = await myNFT.mintNFT(owner.address, tokenURI);
    await tx.wait();
    expect(await myNFT.balanceOf(owner.address)).to.equal(1n);
  });

  it("Should not mint to address zero", async function () {
    const { myNFT } = await deployNFT();
    await expect(
      myNFT.mintNFT(ethers.ZeroAddress, tokenURI)
    ).to.be.revertedWithCustomError(myNFT, "ERC721InvalidReceiver");
  });
});