// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the OpenZeppelin ERC721 and URI Storage contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol"; // Console is useful for debugging but can be removed in production

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter; // Using the Counters library
    Counters.Counter private _tokenIds; // Counter for token IDs

    constructor() ERC721("MyNFT", "MNFT") {} // Constructor initializes the ERC721 token

    // Function to mint a new NFT
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment(); // Increment the token counter

        uint256 newItemId = _tokenIds.current(); // Get the current token ID
        _mint(recipient, newItemId); // Mint the NFT
        _setTokenURI(newItemId, tokenURI); // Set the URI for the newly minted token
        
        return newItemId; // Return the new token ID
    }
}
