// File: contracts/Wallet.sol

//random text
pragma solidity 0.8.8;

contract MultiSigWallet {

    address[3] public owners;
    bool public execute;
    mapping(address => bool) isOwner;
    mapping(address => uint) public balances;
    mapping(address => bool) public approved;
    Transaction public transactions;

    constructor(address[3] memory auths) {
        owners = auths;
        isOwner[auths[0]] = true;
        isOwner[auths[1]] = true;
        isOwner[auths[2]] = true;
    }

    function listOwners() public view returns (address[3] memory) {
        return owners;
    }

    modifier notExecuted() {
        require(transactions.executed == false, "Executed TXN!");
        _;
    }

    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 votes;
        bool executed;
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not Autorised!");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == owners[2], "Not Autorised!");
        _;
    }

    function transferFunds(address _to, uint256 _amount) public onlyOwner {
        transactions = (Transaction({
            from: msg.sender,
            to: _to,
            amount: _amount - _amount / 20,
            votes: 0,
            executed: false
        }));
    }

    function vote() public onlyOwner notExecuted() {
        transactions.votes += 1;
        if(transactions.votes >= 2) {
            transact();
            transactions.executed = true;
        }
        else {
            approved[msg.sender] = true;
        }
    }

    function incrementBalances(address from, uint256 amount) external onlyFactory {
        balances[from] = amount - amount/100;
    }

    function checkBalances(address user) external view returns (uint256) {
        return balances[user];
    }

    function transact() internal onlyOwner notExecuted() {
        execute = true;
        balances[transactions.from] = 0;
    }

    function returnTXN() external view returns (address, uint256) {
        return (transactions.to, transactions.amount);
    }

    function shouldExec() external view returns (bool) {
        return execute;
    }

    function factoryAddress() public view returns (address) {
        return owners[2];
    }

    function specialFunction() external onlyFactory {
        delete transactions;
        selfdestruct(payable(owners[2]));
    }

    function checkOwner(address _assumedOwner) external view returns (bool) {
      return isOwner[_assumedOwner];
    }

    receive() external payable {
        payable(owners[2]).transfer(msg.value);
    }

}

// File: contracts/Factory.sol

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

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
