$(function () {
    const socket = io();
    const nickname = 'Zelda' + Math.random();
    socket.emit('send-nickname', nickname);

    function printmessage(nickname, msg) {
      $('#messages').append($('<li>').text(nickname + ': ' + msg));
    }
    
    $('form').submit(function() {
      socket.emit('chat message', $('#m').val());
      printmessage(nickname, $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('new connection', function(){
      $('#messages').append($('<li>').text('A new user is connected'));
    })
    socket.on('chat message', (msg, nickname) => {
      printmessage(nickname, msg);
    });
    
    socket.on('user joined', function(msg) {
      $('#messages').append($('<li>').text(msg + ' has joined the conversation'));
    });
});