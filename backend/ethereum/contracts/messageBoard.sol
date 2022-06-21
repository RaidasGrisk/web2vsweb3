// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// define the contract
contract messageBoard {

    string[] messages;

    /**
     * @dev push message to messages array
     * @param message value to push
     */
    function pushMessage(string calldata message) public {
        messages.push(message);
    }

    /**
     * @dev Return messages
     * @return array of messages
     */
    function getMessages() public view returns (string[] memory){
        return messages;
    }
}
