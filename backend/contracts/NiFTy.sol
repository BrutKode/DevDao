//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    
    uint256 lastTokenID;
    mapping(address => uint[]) tokenIDs;
    mapping(uint => bool) priority;

    string high_priority = "https://i.imgur.com/l0p3lBa.jpeg";
    string low_priority = "https://i.imgur.com/oWbiR8V.jpeg";

    constructor() ERC721("Nifty", "NFT") {}

    function mint(bool prioritee) external {
        uint newTokenId = lastTokenID += 1;
        priority[newTokenId] = prioritee;
        tokenIDs[msg.sender].push(newTokenId);
        _mint(msg.sender, newTokenId);
    }

    function tokenURI(uint tokenId) public view override returns(string memory) {
        if(priority[tokenId]) {
            return high_priority;
        } else {
            return low_priority;
        }
    }

    function userTokenIDs(address hodler) public view returns (uint[] memory) {
        return(tokenIDs[hodler]);
    }
}
