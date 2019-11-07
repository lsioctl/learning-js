const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const dbfile = './data.txt';
const msgStream = fs.createWriteStream(dbfile, {'flags': 'a'});
const connectedUsers = new Map();

io.on('connection', function(socket){
  console.log(io.connected);
  socket.broadcast.emit('new connection');
  socket.on('chat message', function (msg) {
    let daten = Date.now();
    let nickname = socket.nickname;
    console.log(socket.nickname + msg)
    socket.broadcast.emit('chat message', msg, nickname);
    // we use object litterals from ES6
    let data = {
      daten,
      nickname,
      msg
    }
    // the JSON stuff seems to do a lot of escaping, avoiding 
    // \n or JSON in text messages
    let jsonData = JSON.stringify(data);
    msgStream.write(jsonData + '\n');
  });
  socket.on('send-nickname', function(nickname) {
    socket.nickname = nickname;
    socket.broadcast.emit('user joined', socket.nickname);
    connectedUsers.set(nickname, 'online');
    console.log(connectedUsers);
    console.log(Array.from(connectedUsers));
    /**
     * Map is not serializable in JSON, so we have to convert to
     * array. Socket.io needs a serializable type
     * see: https://stackoverflow.com/questions/40766650/how-to-emit-a-map-object
     */
    socket.emit('connected users', Array.from(connectedUsers));
  });
  socket.on('user typing', function() {
    console.log(socket.nickname + ' is typing');
  })
  socket.on('user stopped typing', function() {
    console.log(socket.nickname + ' stopped typing');
  })
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
