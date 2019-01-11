var minimize = document.getElementById('minimize');
var maximize = document.getElementById('maximize');
var exit = document.getElementById('messageexit');
var exitmin = document.getElementById('messageexitmin');
var maximum = document.getElementById('maxbox');
var minimum = document.getElementById('minbox');




minimize.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'block';
});

exit.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'none';
})

exitmin.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'none';
})

maximize.addEventListener('click', function(){
  maximum.style.display = 'block';
  minimum.style.display = 'none';
})

socket = io.connect('http://' + document.domain + ':' + location.port )

socket.on('connect', function(){
    socket.emit('connected', {data: "I'm connected"})
})


$('#submitform').on('submit', function(e){
  console.log('test')
  var ticketval = document.getElementById('tickettype');
  socket.emit('adminticketblast', {
    site : document.getElementById('sitename').innerHTML,
    username: document.getElementById('un').innerHTML,
    type: ticketval.options[ticketval.selectedIndex].text,
    message : $('#userticket').val(),
  });
  $('#userticket').val('')
});

socket.on('privateadmintickets', function(data, ticket){
  console.log(ticket)
  $('#queue').append("<div class='col-sm-3 admintick' style='min-width:175px;height:200px;background-color:lightgray'>" + '<h1>' + data['site'] + '</h1>' + '<h5>' + data['type'] + '</h5>' + '</div>')
  $('.admintick').attr('id', 'ticket'+ ticket);
  $('#ticket' + ticket).on('click', test)
  socket.emit('adminselected', {
    username : document.getElementById('adminun').innerHTML,
    ticketid : ticket
  })
})

function test(){
  console.log($(this).attr('id') + ' was selected');
}


socket.on('selected_confirmed', function(data){
  
    console.log('The ticket has been selected by: ' + data['username']);
    console.log('Selected tickets id: #ticket' + data['ticketid']);
    
  
  
});
