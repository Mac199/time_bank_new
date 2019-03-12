var TimeBank = artifacts.require("./TimeBank.sol");
var Balance = artifacts.require("./Balance.sol");
module.exports = function(deployer) {
  deployer.deploy(TimeBank);
  deployer.deploy(Balance);
};
