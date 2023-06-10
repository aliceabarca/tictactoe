var playerOneContainer = document.querySelector('.player-1-container');
var playerTwoContainer = document.querySelector('.player-2-container');
var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('.player-1-container .win-count');
var playerTwoWinCount = document.querySelector('.player-2-container .win-count');
var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid');
var row = document.querySelectorAll('.row');

var player1 = createPlayer('🥸', 'player 1', 0);
var player2 = createPlayer('🤖', 'player 2', 0);
var players = [player1, player2];
var currentPlayer;
var gameBoard = ['', '', '', '', '', '', '', '', ''];

ticTacToeGrid.addEventListener('click', checkBox);
ticTacToeGrid.addEventListener('click', updateGame)
window.addEventListener('load', displayTurn)

function checkBox(event) {
  var target = event.target.id
  if (target) {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    playersTurnHeading.innerText = `It's ${currentPlayer.token}'s turn.`;
  }
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

function updateGame(event) {
  var box = Array.from(gridItems).indexOf(event.target);
  console.log(box)
  if (gameBoard[box] === '') {
    gameBoard[box] = currentPlayer.token;
    event.target.textContent = currentPlayer.token;
  }
}

function switchTurn() {
  player1.isTurn = !player1.isTurn;
  player2.isTurn = !player2.isTurn;
}

function displayTurn() {
  if (player1.isTurn === false) {
    playersTurnHeading.innerText = `It's ${player1.token}'s turn.`;
  } else {
    playersTurnHeading.innerText = `It's ${player2.token}'s turn.`
  }
}

function getRandomPlayer() {
  var randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

function createPlayer(token, id, wins) {
  return {
    token: token,
    id: id,
    wins: wins,
    isTurn: false,
    boxesTaken: []
  }
}