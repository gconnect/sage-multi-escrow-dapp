// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Escrow {

    struct EscrowData {
        uint256 amount;
        // uint256 releaseTime;
        address payable sender;
        bool returned;
    }

    EscrowData [] public escrowList;

    address payable owner;
    mapping(address => EscrowData) public escrows;

    event FundsEscrowed(address indexed sender, uint256 amount);
    event FundsReturned(address indexed sender, uint256 amount);

    constructor(){
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function escrowFunds() external payable {
        // require(_releaseTime > block.number, "Release time must be in the future");
        require(msg.value > 0, "Amount must be greater than 0");

        EscrowData storage escrowData = escrows[msg.sender];
        require(escrowData.amount == 0, "Sender already has an active escrow");

        escrowData.amount = msg.value;
        // escrowData.releaseTime = _releaseTime;
        escrowData.sender = payable(msg.sender);
        escrowData.returned = false;

        //Handle storing of escrow data in a list;
        escrowList.push(EscrowData(msg.value, payable(msg.sender), false));
        emit FundsEscrowed(msg.sender, msg.value);
    }

    function returnFunds(address _sender) external onlyOwner {
        EscrowData storage escrowData = escrows[_sender];
        require(!escrowData.returned, "Funds have already been returned");
        // require(block.timestamp >= escrowData.releaseTime, "Release time has not arrived yet");
        require(escrowData.sender == _sender, "You don't money on the escrow");
        escrowData.returned = true;
        escrowData.sender.transfer(escrowData.amount);

        emit FundsReturned(escrowData.sender, escrowData.amount);
    }

    function batchTransfer(address payable[] calldata _receivers, uint256[] calldata _amounts) external onlyOwner {
        require(_receivers.length == _amounts.length, "Number of receivers must be equal to number of amounts");

        for (uint256 i = 0; i < _receivers.length; i++) {
            EscrowData storage escrowData = escrows[_receivers[i]];
            require(!escrowData.returned, "Funds have already been returned");
            // require(block.timestamp >= escrowData.releaseTime, "Release time has not arrived yet");

            escrowData.returned = true;
            _receivers[i].transfer(_amounts[i]);

            emit FundsReturned(_receivers[i], _amounts[i]);
        }
    }

     function groupRefund() external onlyOwner {
        for (uint256 i = 0; i < escrowList.length; i++) {
            EscrowData storage escrowData = escrowList[i];
            require(!escrowData.returned, "Funds have already been returned");
            escrowData.returned = true;
            escrowData.sender.transfer(escrowData.amount);
            emit FundsReturned(escrowData.sender, escrowData.amount);
        }
    }

    function getEcrowList() public view returns(EscrowData [] memory){
        return escrowList;
    }

    function getContractBalance() public onlyOwner view returns(uint256) {
        return address(this).balance;
    }

}
