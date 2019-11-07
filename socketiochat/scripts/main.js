const socket = io.connect('http://localhost:5000');
const nickname = 'Zelda' + Math.random();
socket.emit('send-nickname', nickname);

const messages = document.getElementById('messages');
const inputMessage = document.getElementById('m');
const messageForm = document.getElementById('send');
const userStatus = document.getElementById('user-status');

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

function initUserStatus(connectedUsersArray) {
  const connectedUsersMap = new Map(connectedUsersArray);
  connectedUsersMap.forEach((value, key) => {
    const userStatusItem = document.createElement('div');
    userStatusItem.innerText = `${key}: ${value}`;
    userStatus.appendChild(userStatusItem);
  });
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

function sendStoppedTyping() {
  socket.emit('user stopped typing');
}

function sendTyping() {
  socket.emit('user typing');
}

/**
 * 
 * I struggle to make a generic function of this like
 * delay or debounce.
 * Here I want to handle the first time the event is fired
 * and wait x ms after the last event
 * 
 * Could do more elegant (because no top scope variable timer)
 * but less readable code with closure
 * 
 */
let typingTimer = 0;

function handleUserStoppedTyping() {
  sendStoppedTyping();
  typingTimer = 0;
}

function handleUserTyping() {
  console.log(typingTimer);
  if (typingTimer == 0) {
    sendTyping();
  } else { 
    clearTimeout(typingTimer);
  }
  typingTimer = setTimeout(handleUserStoppedTyping, 1000); 
}

socket.on('new connection', function(){
  printInfo('A new user is connected');
});

socket.on('chat message', (msg, nickname) => {
  printMessage(nickname, msg);
});

socket.on('user joined', function(nickname) {
  printInfo(nickname + ' has joined the conversation');
});

socket.on('connected users', function(connectedUsersArray) {
  initUserStatus(connectedUsersArray);
})

messageForm.addEventListener('submit', handleInputMessage);

messageForm.addEventListener('keyup', handleUserTyping);
