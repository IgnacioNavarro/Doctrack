/* eslint-disable no-undef */
const EnterpriseContract = artifacts.require("EnterpriseContract");

let instance;

beforeEach(async () => {
    instance = await EnterpriseContract.new()
});

contract('EnterpriseContract', accounts => {
    it('should add a enterprise', async () => {
        await instance.addEnterprise(accounts[1], "Universidad de Sevilla", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        const enterprise = await instance.getEnterprise(accounts[1]);
        assert(enterprise!=null, "Enterprise not found");
    });

    it('should get a enterprise', async () => {
        await instance.addEnterprise(accounts[1], "Universidad de Sevilla", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        const enterprise = await instance.getEnterprise(accounts[1]);
        assert(enterprise.name==="Universidad de Sevilla", "Enterprise not found");
    });

    it('should update minimum level', async () => {
        await instance.addEnterprise(accounts[1], "Universidad de Sevilla", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        await instance.updateMinimumLevel(accounts[1], 2);
        const enterprise2 = await instance.getEnterprise(accounts[1]);
        assert.equal(enterprise2.minimumLevel, 2);
    });

    it('should update enterprise', async () => {
        await instance.addEnterprise(accounts[1], "Universidad de Sevilla", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        const enterprise = await instance.getEnterprise(accounts[1]);
        await instance.addEnterprise(accounts[1], "Universidad de Mallorca", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        const enterprise2 = await instance.getEnterprise(accounts[1]);
        assert(enterprise.name !== enterprise2.name, "Enterprise not different");
        assert(enterprise2.name==="Universidad de Mallorca", "Enterprise not found");
    });

    it('should get enterprises', async () => {
        await instance.addEnterprise(accounts[1], "Universidad de Sevilla", "S.L",  
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        await instance.addEnterprise(accounts[2], "Universidad de Mallorca", "S.L",
        "63736384L", "578346576", "us@us.es", "Spain", "Sevilla","41012","Sevilla", "Huracan");
        const enterprises = await instance.getAllEnterprises();
        assert(enterprises.length===2, "Enterprises not found");
    });
});