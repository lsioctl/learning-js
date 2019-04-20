const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const dbfile = './data.txt';
const msgStream = fs.createWriteStream(dbfile, {'flags': 'a'});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/jquery', express.static('./node_modules/jquery'));
app.use('/scripts', express.static('./scripts'));

io.on('connection', function(socket){
  socket.broadcast.emit('new connection');
  socket.on('chat message', function(msg){
    let daten = Date.now();
    let nickname = socket.nickname;
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
});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
