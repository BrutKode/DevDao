//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    
    uint256 lasTokenID;
    mapping(address => uint[]) tokenIDs;

    string uri = "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png";

    constructor() ERC721("Nifty", "NFT") {}

    function mint() external {
        uint newTokenId = lasTokenID += 1;
        tokenIDs[msg.sender].push(newTokenId);
        _mint(msg.sender, newTokenId);
    }

    function tokenURI(uint _tokenId) public view override returns(string memory) {
        return uri;
    }

    function userTokenIDs(address hodler) public view returns (uint[] memory) {
        return(tokenIDs[hodler]);
    }

}
