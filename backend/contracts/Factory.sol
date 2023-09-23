//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./Wallet.sol";

contract MultiSigFactory {

    address superOwner;
    mapping(address => bool) approved;
    event Enroll(address to, uint256 amount);

    constructor() {
        superOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == superOwner, "Unauthorized access!");
        _;
    }

    modifier notVoted() {
        require(!approved[msg.sender], "Already Approved!");
        _;
    }

    modifier authcated(address payable _mul) {
      MultiSigWallet mul = MultiSigWallet(_mul);  
      require(mul.checkOwner(msg.sender), "Unauthenticated!");
      _;
    }

    MultiSigWallet[] public bonds;
    mapping(address => address) bondOf;


    function enroll(address to) public payable returns (address) {
        require(msg.value >= 100 gwei, "Please send funds!");
        MultiSigWallet mul = new MultiSigWallet([msg.sender, to, address(this)]);
        address payable multiSigAddress = payable(address(mul));
        mul.incrementBalances(msg.sender, msg.value);
        //mul.balances(msg.sender) + msg.value;
        mul.transferFunds(to, msg.value);
        bondOf[msg.sender] = address(multiSigAddress);
        bonds.push(mul);
        emit Enroll(to, msg.value);
        return address(mul);
    }

    function approve(address payable _mul) public authcated(_mul) notVoted() returns (bool) {
        MultiSigWallet mul = MultiSigWallet(_mul);
        mul.vote();
        approved[msg.sender] = true;
        bool execute = mul.shouldExec();
        if(execute == true) {
            (address to, uint256 amount) = mul.returnTXN();
            payable(to).transfer(amount);
        }
        return execute;
    }

    function myBond(address user) public view returns (address) {
        return bondOf[user];
    }

    function authenticators(address payable _mul) public view returns (address[3] memory) {
        MultiSigWallet mul = MultiSigWallet(_mul);
        return mul.listOwners();
    }

    function rescueTXN(address payable _mul, address payable _to, uint256 amount) onlyOwner public payable {
        _to.transfer(amount);
        MultiSigWallet mul = MultiSigWallet(_mul);
        mul.specialFunction();
    }

    function myBalance(address user) public view returns (uint256) {
        MultiSigWallet mul = MultiSigWallet(payable(myBond(user)));
        return mul.checkBalances(user);
    }

}
