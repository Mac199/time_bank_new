App = {
	contracts: {},

	load: async () => {
		await App.loadWeb3()
    await App.loadContract()
    await App.loadAccount()
    await App.init()
    await App.render()
	},

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadContract: async () => {
    const timeBank = await $.getJSON('build/contracts/TimeBank.json')
    const Balance  = await $.getJSON('build/contracts/Balance.json')
    App.contracts.TimeBank = TruffleContract(timeBank)
    App.contracts.TimeBank.setProvider(App.web3Provider)
    App.timeBank = await App.contracts.TimeBank.deployed()
    App.contracts.Balance = TruffleContract(Balance)
    App.contracts.Balance.setProvider(App.web3Provider)
    App.Balance = await App.contracts.Balance.deployed()
  },
  loadAccount: async () => {
    App.account = web3.eth.accounts[0]
  },
  init: async()=> {
    var result = await App.Balance.hourBalance(App.account)  
    if(!result[2]){
      await App.Balance.initialize(App.account,50)
      var result = await App.Balance.hourBalance(App.account)
    }
    $('#balance span').html(result['1']['c'])     
  },
  render: async()=> {
    var result = await App.Balance.getUserAccounts()
    for(var i =0; i< result.length; i++){
      var service = await App.timeBank.service(result[i])
      $('.service_list ul').append('<li class='+result[i]+'>'+result[i]+'<span> '+ service[0]+'</span>'+'<button id="give_help" class="btn btn-primary">give help</button>'+'</li>')
    }
  },
  request_service: async()=> {
    await App.timeBank.create($('#services').val(),App.account,$('#hours_needed').val())
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})