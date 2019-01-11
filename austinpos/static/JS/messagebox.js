var minimize = document.getElementById('minimize');
var maximize = document.getElementById('maximize');
var exit = document.getElementById('messageexit');
var exitmin = document.getElementById('messageexitmin');
var maximum = document.getElementById('maxbox');
var minimum = document.getElementById('minbox');

// Minimize message box
minimize.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'block';
});

//EXIT MESSAGE BOX
exit.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'none';
})

// EXIT MINIMIZED MESSAGE BOX
exitmin.addEventListener('click', function(){
  maximum.style.display = 'none';
  minimum.style.display = 'none';
})

//MAXIMIZE MIN MESSAGE BOX
maximize.addEventListener('click', function(){
  maximum.style.display = 'block';
  minimum.style.display = 'none';
})

socket = io.connect('http://' + document.domain + ':' + location.port )

socket.on('connect', function(){
    socket.emit('connected', {data: "I'm connected"})
})

//SUBMIT USERS TICKET INFO
$('#submitform').on('submit', function(e){
  e.preventDefault()
  console.log('test')
  var ticketval = document.getElementById('tickettype');
  socket.emit('adminticketblast', {
    site : document.getElementById('sitename').innerHTML,
    username: document.getElementById('un').innerHTML,
    type: ticketval.options[ticketval.selectedIndex].text,
    message : $('#userticket').val(),
  });
  
  document.getElementById('maxbox').style.display = 'block';
  $('#messages').append('<div>' + "<span style='color:black;'>" + document.getElementById('un').innerHTML + ': ' + "</span>" + $('#userticket').val() + '</div>')
  $('#userticket').val('')
});

// SEND TICK TO ALL ADMINS
socket.on('privateadmintickets', function(data, ticket){
  var $divvyadmin = $("<div></div>")
  $divvyadmin.attr('id', 'admin'+ticket)

  var $divvy = $("<div class='col-sm-3 border' style='min-width:225px;height:200px;background-color:lightgray; margin-left:5px;border-radius:5px !important;'>" + '<h1>' + data['site'] + '</h1>' + '<h4>' + data['type'] + '</h4>' + '<p>' + data['username'] + '</p>' + '</div>')
  $divvy.attr('id', 'ticket'+ ticket);
  $('#queue').append($divvyadmin);
  $('#admin' + ticket).append($divvy)
  $('#ticket'+ticket).on('click', test)
  function test(){
    console.log($(this).attr('id') + ' was selected');
    socket.emit('adminselected', {
      username : document.getElementById('adminun').innerHTML,
      ticketid : ticket,
      data_ : data
    })
  }
})

socket.on('selected_confirmed', function(data){
  if(document.getElementById('adminstatus').innerHTML == 'True'){
    var spanny = document.getElementById('spanid'+ data['ticketid'])
    var div = document.getElementById('admin' + data['ticketid']).contains(spanny);
    console.log(data['data_'])
    console.log(div);

    if(div == true){
      console.log('Ticket already taken')
    }else{
      console.log('The ticket has been selected by: ' + data['username']);
      console.log('Selected tickets id: #ticket' + data['ticketid']);
      document.getElementById('ticket' + data['ticketid']).style.boxShadow = "0px -5px 20px -5px #888888";
      var $divvy = $("<span style='color:red'>" + data['username'] + "'s ticket" + '</span>');
      $divvy.attr('id', 'spanid' + data['ticketid']);
      $('#admin' + data['ticketid']).append($divvy);
      
      socket.emit('displaymessage', {
        adminsmess : data['data_'],
        admin : data['username']
      });
    }
  }
});

socket.on('showadminmessage', function(data){
  console.log(data['adminsmess'])
  document.getElementById('maxbox').style.display = 'block';
  document.getElementById('user').innerHTML = data['adminsmess']['username'];
  $('#messages').append('<div>' + "<span style='color:black;'>" + data['adminsmess']['username'] + ': ' + "</span>" + data['adminsmess']['message'] + '</div>')
});


$('#form2').on('submit', function(e){
  e.preventDefault()
  // console.log(document.getElementById('adminstatus'))
  if(document.getElementById('adminstatus').innerHTML == 'True'){
    socket.emit('messagestream', {
      message: $('#messageinput').val(),
      username: document.getElementById('adminun').innerHTML,
      recipient: document.getElementById('user').innerHTML
    });
    $('#messages').append('<div>' + "<span style='color:black;'>" + document.getElementById('adminun').innerHTML + ': ' + '</span>' + $('#messageinput').val() + '</div>')
    $('#messageinput').val('').focus()
  }else{
    socket.emit('messagestream', {
      message: $('#messageinput').val(),
      username: document.getElementById('un').innerHTML,
      recipient: document.getElementById('user').innerHTML
    });
    $('#messages').append('<div>' + "<span style='color:black;'>" + document.getElementById('un').innerHTML + ': ' + '</span>' + $('#messageinput').val() + '</div>')
    $('#messageinput').val('').focus()
  }
});

socket.on('playerroom', function(data){
  console.log('player room test')
  document.getElementById('user').innerHTML = data['username']
  $('#messages').append('<div>' + "<span style='color:black;'>" + data['username'] + ': ' + '</span>' + data['message'] + '</div>')
})