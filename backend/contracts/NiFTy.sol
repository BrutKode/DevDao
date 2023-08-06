//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
     constructor() ERC721("Nifty", "NFT") {
         _mint(msg.sender, 1000);
     }
}