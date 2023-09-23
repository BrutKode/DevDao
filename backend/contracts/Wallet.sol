//SPDX-License-Identifier: MIT
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
