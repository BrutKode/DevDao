//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    
    uint256 lastTokenID;
    string uri;
    mapping(address => uint[]) tokenIDs;

    constructor() ERC721("Nifty", "NFT") {}

    function mint() external {
        uint newTokenId = lastTokenID += 1;
        tokenIDs[msg.sender].push(newTokenId);
        _mint(msg.sender, newTokenId);
    }

    function _baseURI() internal override view returns (string memory) {
        return uri;
    }

    function userTokenIDs(address hodler) public view returns (uint[] memory) {
        return(tokenIDs[hodler]);
    }

    function updateTokenURI(string memory _link) public {
        uri = _link;
    }

}