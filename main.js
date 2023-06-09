var playerOneContainer = document.querySelector('.player-1-container');
var playerTwoContainer = document.querySelector('.player-2-container');
var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('.player-1-container .win-count');
var playerTwoWinCount = document.querySelector('.player-2-container .win-count');
var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid');
var currentPlayer;

var emojis = ['🥸', '🤖']


ticTacToeGrid.addEventListener('click', checkBox);
window.addEventListener('load', displayTurn)

function createPlayer(player, token, id) {
  return {
    player: player,
    token: token,
    id: id,
    win: false
  }
}

function getRandomEmoji() {
  var randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

function displayTurn() {
  for (var i = 0; i < emojis.length; i++) {
    playersTurnHeading.innerText = `It's ${[getRandomEmoji()]}'s turn`
  }
}

function checkBox(event) {
  console.log(event.target)
}

function winGame() { 
  var winCombo = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [7, 5, 3],
    [1, 5, 9]
  ];
  return winCombo;
}
