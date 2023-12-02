//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;


contract MessageContract{

        struct Message{
        uint id;
        string subject;
        string content;
        address user;
        address enterprise;
        string documenthash;
        //añadir timestamp
        //estados
        bool sent;
        bool downloaded;
        bool resent;
        bool confirmed;
        bool rejected;
    }

    //user lists
    mapping(address => uint[]) private userMessages;
    Message[] private messageList;

    //entrerprise lists
    mapping(address => uint[]) private enterpriseMessages;
    Message[] private enterpriseMessageList;



    function writeMessage(address _userWallet, address _enterpriseWallet, string memory _subject, string memory _content, string memory _documentHash) public {
        uint id = messageList.length;
        Message memory message = Message(id,_subject, _content, _userWallet, _enterpriseWallet, _documentHash, true, false, false, false, false);
        messageList.push(message);
        userMessages[_userWallet].push(messageList.length-1);

        //no creo que esté bien
        enterpriseMessageList.push(message);
        enterpriseMessages[_enterpriseWallet].push(messageList.length-1);
    }

    function getAllMessagesFromUser(address _userWallet) public view onlyOwner(_userWallet) returns(Message[] memory){
        uint numberOfMessages = userMessages[_userWallet].length;
        Message[] memory userMessageList = new Message[](numberOfMessages);
        uint[] memory messagesId = userMessages[_userWallet];
        for(uint j = 0; j< numberOfMessages; j++){
            uint id = messagesId[j];
            Message memory  message = messageList[id];
            userMessageList[j] = message;

        }

        return userMessageList;
    }

    function getMessage(uint _id) public view returns(Message memory){
        return messageList[_id];
    }

    
    //modifier to check if the user is the owner of the message
    modifier onlyOwner(address _userWallet) {
        require(_userWallet == msg.sender);
        _;
    }

    //messages user enterprise
    // creo que tengo que hacer otra lista para empresas
    // y despues replicar all messages from  user

    function getAllMessagesFromEnterprise(address _enterpriseWallet) public view returns(Message[] memory){
        uint numberOfMessagesEnterprise = enterpriseMessages[_enterpriseWallet].length;
        Message[] memory userMessageList = new Message[](numberOfMessagesEnterprise);
        uint[] memory messagesId = enterpriseMessages[_enterpriseWallet];
        for(uint j = 0; j< numberOfMessagesEnterprise; j++){
            uint id = messagesId[j];
            Message memory  message = messageList[id];
            userMessageList[j] = message;

        }

        return userMessageList;
    }

    function setDownloaded(uint _id) public {
        messageList[_id].downloaded = true;
    }

    function setConfirmed(uint _id) public {
        messageList[_id].confirmed = true;
    }

    function setRejected(uint _id) public {
        messageList[_id].rejected = true;
    }





}