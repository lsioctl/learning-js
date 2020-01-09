import Game from './Game.js';

let level = 1;
const buttonStart = document.getElementById('start');
const game = new Game();

buttonStart.addEventListener('click', game.startLevel);