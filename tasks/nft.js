const { task } = require("hardhat/config"); // Correctly import task from hardhat/config
require("dotenv").config(); // Load environment variables

// Task to deploy the contract
task("deploy-contract", "Deploy NFT contract")
  .setAction(async (_, hre) => {
    const ContractFactory = await hre.ethers.getContractFactory("MyNFT");
    const contractInstance = await ContractFactory.deploy();
    await contractInstance.deployed();

    console.log("Contract deployed to:", contractInstance.address);
    return contractInstance.address; // Return contract address if needed
  });

// Task to mint an NFT using an existing contract
task("mint-nft", "Mint an NFT")
  .addParam("tokenuri", "Your ERC721 Token URI")
  .setAction(async (taskArgs, hre) => {
    const { tokenuri } = taskArgs;

    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error("NFT contract address is not defined in the environment variables.");
      return;
    }

    // Get the contract instance at the deployed address
    const nftContract = await hre.ethers.getContractAt("MyNFT", contractAddress);

    // Mint an NFT
    const tx = await nftContract.mintNFT(process.env.ETH_PUBLIC_KEY, tokenuri);
    console.log(`NFT minted with TX hash: ${tx.hash}`);
  });
