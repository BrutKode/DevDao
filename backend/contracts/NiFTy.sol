//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    
    uint256 lastTokenID;

    constructor() ERC721("Nifty", "NFT") {}

    function mint() external {
        _mint(msg.sender, lastTokenID += 1);
    }

    function _baseURI() internal override pure returns (string memory) {
        return "https://www.goodfreephotos.com/albums/food/cup-of-coffee-on-a-plate.jpg";
    }

}