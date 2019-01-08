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


// var ticketform = $('#submitform').on('submit', function(e){
//   e.preventDefault()
//   var username = document.getElementById('un').innerHTML;
//   //DISPLAY MESSAGE BOX
  
//   maximum.style.display = 'block';

//   $('#messages').append('<div>'+"<span style='color:black'>"+username+': '+'</span>' +$('#userticket').val()+'</div>')
  

//   socket.emit('ticket', {
//     title : $('#issue').val(),
//     site : document.getElementById('sitename').innerHTML,
//     user : username, 
//     message: $('#messageinput').val()
//   })
//   $('#userticket').val('');
//   $('#messageinput').val('').focus()
// })

// MESSAGE BOX
var form = $('#form2').on('submit', function(e){
    e.preventDefault()
    var username = document.getElementById('un').innerHTML;
    if(document.getElementById('adminstatus').innerHTML == 'True'){
      socket.emit('private', {
          recipient: $('#recipient').val(),
          user : username,
          msg : $('#messageinput').val()
      })
      $('#messages').append('<div>'+"<span style='color:black'>"+username+': '+'</span>' +$('#messageinput').val()+'</div>')
      $('#messageinput').val('').focus()
    }else{
      
      socket.emit('private', {
          user : username,
          msg : $('#messageinput').val()
      })
      $('#messages').append('<div>'+"<span style='color:black'>"+username+': '+'</span>' +$('#messageinput').val()+'</div>');
      $('#messageinput').val('').focus();
    }
    
});

socket.on('privatemessages', function(message){
    console.log(message['msg'])
    if(document.getElementById('adminstatus').innerHTML == 'True'){
      $(document).ready(function(){
        $('#nomess').remove()
        $('#messages').append('<div>'+"<span style='color:black'>"+message['user']+': '+'</span>' + message['msg']+'</div>')
        console.log(message['user'], 'wow')
        document.getElementById('user').innerHTML = message['user'];
        // document.getElementById('queue').innerHTML = message['user'];
        $('#queue').append("<div class='border col-3' style='width:200px;height:200px;border-radius:5px; background-color:gray;'>" + message['user'] + "</div>")
      })
    }else{
      $('#nomess').remove()
        $('#messages').append('<div>'+"<span style='color:black'>"+message['user']+': '+'</span>' + message['msg']+'</div>');
        console.log(message['user'])
        document.getElementById('user').innerHTML = message['user'];
    }
});

// socket.on('privateticket', function(ticket){
//   // $('#messages').append('<div>'+"<span style='color:black'>"+message['user']+': '+'</span>' + message['msg']+'</div>');
//   $('#queue').append("<div class='border col-3' style='width:200px;height:200px;border-radius:5px; background-color:gray;'>" + ticket['site'] + "</div>")
// });