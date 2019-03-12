pragma solidity ^0.5.0;

contract Balance {
  struct HourBalance {
      address addr;
      uint amount;
      bool init;
  }
  address[] public userAccounts;
  mapping (address => HourBalance) public hourBalance;
  function initialize (address _address, uint _amount) public{
     hourBalance[_address] = HourBalance(_address, _amount, true);
     userAccounts.push(_address);
  }
  function changeBalance(uint _hours, address _worker) public {
    require (hourBalance[msg.sender].amount > _hours); 
    hourBalance[msg.sender].amount = hourBalance[msg.sender].amount - _hours;
    hourBalance[_worker].amount = hourBalance[_worker].amount + _hours;
  }        
}
