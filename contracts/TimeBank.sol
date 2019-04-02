pragma solidity ^0.5.0;
contract TimeBank {
	struct Service {
		string service;
		bool complete;
		uint hour;
		address serviceProvider;
	}
 	
	mapping (address => Service) public service;
	function create ( string memory _service, address _account, uint _hour, address _provider) public {
		service[_account] = Service( _service, false, _hour, _provider);
	}
	function setServiceProvider(address _account, address _provider) public{
		service[_account].serviceProvider = _provider;
	}
	function resetService(address _account) public {
		service[_account] = Service('',false,0,0x0000000000000000000000000000000000000000);
	}
}


