/* eslint-disable no-undef */
const UserContract = artifacts.require("UserContract");

let instance;

beforeEach(async () => {
    instance = await UserContract.new()
});

contract('UserContract', accounts => {
    it('should add a user', async () => {
        await instance.addUser(accounts[0], "Ignacio", "Navarro",  
        "7793456789C", "647381472", "ignacio@testing.com", "Spain", "Sevilla","41012",
        "Sevilla", "Huracan");
        const user = await instance.getUser(accounts[0]);
        assert(user!=null, "User not found");
        
    });

    it('should get a user', async () => {
        await instance.addUser(accounts[0], "Ignacio", "Navarro",  
        "7793456789C", "647381472", "ignacio@testing.com", "Spain", "Sevilla","41012",
        "Sevilla", "Huracan");
        const user = await instance.getUser(accounts[0]);
        assert(user.name==="Ignacio", "User not found");
    });

    it('should update a user', async () => {
        await instance.addUser(accounts[0], "Ignacio", "Navarro",  
        "7793456789C", "647381472", "ignacio@testing.com", "Spain", "Sevilla","41012",
        "Sevilla", "Huracan");
        const user = await instance.getUser(accounts[0]);
        await instance.updateUser(accounts[0], "Fernando", "Rabasco",  
        "7793456789C", "647381472", "ignacio@testing.com", "Spain", "Sevilla","41012",
        "Sevilla", "Huracan");
        const user2 = await instance.getUser(accounts[0]);
        assert(user.name !== user2.name, "User not different");
        assert(user2.name==="Fernando", "User not found");
        assert(user2.surname==="Rabasco", "User not found");
    });

    it('should update image Hash', async () => {
        await instance.addUser(accounts[0], "Ignacio", "Navarro",  
        "7793456789C", "647381472", "ignacio@testing.com", "Spain", "Sevilla","41012",
        "Sevilla", "Huracan");
        const user = await instance.getUser(accounts[0]);
        await instance.updateImageHash(accounts[0], "0x1234567890");
        const user2 = await instance.getUser(accounts[0]);
        assert(user.imageHash !== user2.imageHash, "image not different");
    });


});