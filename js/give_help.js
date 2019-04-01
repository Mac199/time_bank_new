$(document).ready(function(){

  $(document).on('click', '#give_help', function(){
  	var account = $(this).parent().attr('class')
  	App.timeBank.setServiceProvider(account, $("#user").html())
  	$('.'+account).hide()
  });
})