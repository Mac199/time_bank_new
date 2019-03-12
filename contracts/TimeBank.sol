pragma solidity ^0.5.0;
contract TimeBank {
	struct Service {
		string service;
		bool complete;
	}
 	
	mapping (address => Service) public service;
	function create ( string memory _service, address _account) public {
		service[_account] = Service( _service, false);
	}
}


