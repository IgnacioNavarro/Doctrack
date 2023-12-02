/* eslint-disable no-undef */
const UserContract = artifacts.require("UserContract");
const EnterpriseContract = artifacts.require("EnterpriseContract");
const MessageContract = artifacts.require("MessageContract");

module.exports = function (deployer) {
  deployer.deploy(UserContract);
  deployer.deploy(EnterpriseContract);
  deployer.deploy(MessageContract);
};

