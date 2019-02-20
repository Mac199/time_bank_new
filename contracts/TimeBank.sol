pragma solidity ^0.5.0;

/**
 * The TimeBank contract does this and that...
 */
contract TimeBank {
	struct Service {
		uint id;
		string service;
		bool complete;
		uint balance;	
	}

	mapping (address => Service) public service;
	function create (uint _id, string memory _service, uint _balance, address _account) public {
		service[_account] = Service(_id, _service, false, _balance);
	}

	function changeBalance(uint _hours, address _worker) public {
		require (service[msg.sender].balance > _hours);	
		service[msg.sender].balance = service[msg.sender].balance - _hours;
		service[_worker].balance = service[_worker].balance + _hours;
	}
}

