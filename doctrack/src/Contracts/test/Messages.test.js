/* eslint-disable no-undef */
const MessageContract = artifacts.require("MessageContract");

let instance;

beforeEach(async () => {
    instance = await MessageContract.new()
});

contract('MessageContract', accounts => {
    it('should write a message', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        const message = await instance.getMessage(0); 
        assert(message!=null, "Message not found");
    });

    it('should get a message', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        const message = await instance.getMessage(0); 
        assert(message.subject==="Mensaje", "Message not found");
    });

    it('should set a message as downloaded', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        const message = await instance.getMessage(0); 
        await instance.setDownloaded(0);
        const message2 = await instance.getMessage(0); 
        assert(message.downloaded !== message2.downloaded, "Message not different");
    });

    it('should set a message as confirmed', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        await instance.setConfirmed(0);
        const message2 = await instance.getMessage(0); 
        assert(message2.confirmed === true, "Message not different");
    });

    it('should set a message as rejected', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        await instance.setRejected(0);
        const message2 = await instance.getMessage(0); 
        assert(message2.rejected === true, "Message not different");
    });

    it('should get all messages from user', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh");
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje2",
        "Cueerpo", "0x7234yd734hkjh");
        const messages = await instance.getAllMessagesFromUser(accounts[0]);
        assert(messages.length===2, "Message not found");
    });

    it('should get all messages to enterprises', async () => {
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje",
        "Cueerpo", "0x7234y734hkjh"); 
        await instance.writeMessage(accounts[0], accounts[1], "Mensaje2",
        "Cueerpo", "0x7234y734hkjh");
        const messages = await instance.getAllMessagesFromEnterprise(accounts[1]);
        assert(messages.length===2, "Message not found");
    });

});