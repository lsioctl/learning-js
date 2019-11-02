const socket = io.connect('http://localhost:5000');
const nickname = 'Zelda' + Math.random();
socket.emit('send-nickname', nickname);

const messages = document.getElementById('messages');
const inputMessage = document.getElementById('m');
const messageForm = document.getElementById('send')

function printMessage(nickname, msg) {
  const messageLine = document.createElement('li');
  messageLine.innerText = `${nickname}: ${msg}`;
  messages.appendChild(messageLine);
}

function printInfo(msg) {
  const infoLine = document.createElement('li');
  infoLine.innerText = `${msg}`;
  messages.appendChild(infoLine);
}

/**
 * 
 * @param {Event} e form submit event
 * this is bound to the form
 * 
 */
function handleInputMessage(e) {
  // prevent the form submit to reload the page
  e.preventDefault();
  const msg = inputMessage.value;
  socket.emit('chat message', msg);
  printMessage(nickname, msg);
  this.reset();
}

socket.on('new connection', function(){
  printInfo('A new user is connected');
});

socket.on('chat message', (msg, nickname) => {
  printMessage(nickname, msg);
});

socket.on('user joined', function(msg) {
  printInfo(msg + ' has joined the conversation');
});

messageForm.addEventListener('submit', handleInputMessage);
