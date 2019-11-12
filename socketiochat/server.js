const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const readline = require('readline');
const dbFile = './data.txt';
const msgStream = fs.createWriteStream(dbFile, {'flags': 'a'});
const connectedUsers = new Map();


/**
 * Save Messages to the DB
 * For now we just use a JSON file
 * 
 */
function messagesToDB(nickname, msg) {
  const daten = Date.now();
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
}

function getDBLineReader() {
  // TODO: impact of require 'global' or require here
  //const lineReader = require('readline').createInterface({
    const lineReader = readline.createInterface({
    // input: require('fs').createReadStream(dbFile)
      input: fs.createReadStream(dbFile)
  });
  return lineReader;
}

io.on('connection', function(socket){
  socket.broadcast.emit('server-new-connection');
  socket.on('client-chat-message', function (msg) {
    let nickname = socket.nickname;
    socket.broadcast.emit('server-chat-message', msg, nickname);
    messagesToDB(nickname, msg);
  });
  socket.on('client-send-nickname', function(nickname) {
    // Avoid identity spoofing
    // Note: been caught in the case of undefined, which is != "" 
    // so this test does not work
    // if (socket.nickname != "" || connectedUsers.has(nickname)) { 
    if (socket.nickname || connectedUsers.has(nickname)) {
      socket.emit('server-nickname-error', 'selected nickname unavailable');
      return;
    }
    socket.nickname = nickname;
    socket.broadcast.emit('server-user-joined', socket.nickname);
    connectedUsers.set(nickname, 'online');
    /**
     * Map is not serializable in JSON, so we have to convert to
     * array. Socket.io needs a serializable type
     * see: https://stackoverflow.com/questions/40766650/how-to-emit-a-map-object
     */
    socket.emit('server-connected-users', Array.from(connectedUsers));
  });
  socket.on('client-req-history', function() {
    getDBLineReader().on('line', function (line) {
      // TODO improve this serialization stuff
      const data = JSON.parse(line);
      socket.emit('server-res-history', data.daten, data.nickname, data.msg);
    });
  });
  socket.on('client-user-typing', function() {
    socket.broadcast.emit('server-user-typing', socket.nickname);
    console.log(socket.nickname + ' is typing');
  })
  socket.on('client-user-stopped-typing', function() {
    socket.broadcast.emit('server-user-stopped-typing', socket.nickname);
    console.log(socket.nickname + ' stopped typing');
  })
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
