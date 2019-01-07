

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

// privatesocket = io.connect('http://' + document.domain + '/private' + ':' + location.port)

socket.on('connect', function(){
    socket.emit('connected', {data: "I'm connected"})
})

var form = $('#form2').on('submit', function(e){
    e.preventDefault()
    var username = document.getElementById('un').innerHTML;
    socket.emit('private', {
        user : username,
        msg : $('#messageinput').val()
    })
    $('#messageinput').val('').focus()
})

socket.on('privatemessages', function(message){
    console.log(message['msg'])
    $(document).ready(function(){
        $('#messages').append('<div>'+message['user'] + message['msg']+'</div>')
        console.log(message['user'])
        document.getElementById('user').innerHTML = message['user']
    })
})

