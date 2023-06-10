var playerOneContainer = document.querySelector('.player-1-container');
var playerTwoContainer = document.querySelector('.player-2-container');
var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('.player-1-container .win-count');
var playerTwoWinCount = document.querySelector('.player-2-container .win-count');
var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid');
var row = document.querySelectorAll('.row');

// var emojis = ['🥸', '🤖']

var player1 = createPlayer('🥸', 'player 1', 0);
var player2 = createPlayer('🤖', 'player 2', 0);
var players = [player1, player2];
var currentPlayer;
var gameBoard = ['', '', '', '', '', '', '', '', ''];

ticTacToeGrid.addEventListener('click', checkBox);
ticTacToeGrid.addEventListener('click', updateGame)
window.addEventListener('load', displayTurn)
// row.addEventListener('click', updateGame)

function checkBox(event) {
  var target = event.target.id
  if (target) {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    playersTurnHeading.innerText = `It's ${currentPlayer.token}'s turn.`;
  }
  // updateGame()
  // console.log(currentPlayer.token)
  // console.log(target === player1.token)
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
  // checkBox()
  // var box = parseInt(event.target.closest('.grid-item').id)
  var box = Array.from(gridItems).indexOf(event.target);
  console.log(box)
  // gameBoard[box] = currentPlayer.token
  if (gameBoard[box] === '') {
    gameBoard[box] = currentPlayer.token;
    event.target.textContent = currentPlayer.token;
    // currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }
}
// console.log(gridItems)

function switchTurn() {
  // if (player1.isTurn === false) {
  //   // player1.isTurn = true;
  //   displayTurn()
  //   player2.isTurn = true;
  // }
  player1.isTurn = !player1.isTurn;
  player2.isTurn = !player2.isTurn;
}

function displayTurn() {
  // switchTurn()
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