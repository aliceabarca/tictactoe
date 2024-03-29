var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('#player-one-win-count');
var playerTwoWinCount = document.querySelector(`#player-two-win-count`);
var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid');

var player1 = createPlayer('🥸', 'player 1', 0);
var player2 = createPlayer('🤖', 'player 2', 0);
var currentPlayer = player1
var gameBoard = ['', '', '', '', '', '', '', '', ''];
var winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// --- Event Listeners
ticTacToeGrid.addEventListener('click', function(event) {
  if (validTokenSpace(event)) {
    displayHeadingTurn(event);
    placeToken(event);
    checkBox(event);
  }
});
window.addEventListener('load', startGame);

// --- Functions
function startGame() {
  displayHeadingTurn();
}

function displayHeadingTurn(event) {
  if (player1.isTurn) {
    playersTurnHeading.innerText = `It's ${player1.token}'s turn.`;
    switchPlayerTurn();
  } else if (player2.isTurn) {
    playersTurnHeading.innerText = `It's ${player2.token}'s turn.`
    switchPlayerTurn();
  }
}

function switchPlayerTurn(event) {
  if(player1.isTurn === true) {
    player1.isTurn = false;
    currentPlayer = player2;
    player2.isTurn = true;
    return;
  } else if (player2.isTurn === true) {
    player1.isTurn = true;
    currentPlayer = player1;
    player2.isTurn = false;
    return;
  }
}

function checkBox(event) {
  var target = event.target.id;
    if (player1.isTurn === true) {
      gameBoard.splice(parseInt(target), 1, player1.token);
      player1.boxesTaken.push(parseInt(target));
      checkWin();
    } else if (player2.isTurn === true) {
      gameBoard.splice(parseInt(target), 1, player2.token);
      player2.boxesTaken.push(parseInt(target));
      checkWin();
    }
  }

function checkWin() {
  if (player1.isTurn) {
    winOrDrawGame(player1);
  } else if (player2.isTurn) {
    winOrDrawGame(player2);
   }
}

function placeToken(event) {
  var box = Array.from(gridItems).indexOf(event.target);
  if (gameBoard[box] === '') {
    gameBoard[box] = currentPlayer.token;
    event.target.textContent = currentPlayer.token;
  }
}

function displayPlayerWins(player) {
  if (player === player1) {
    playerOneWinCount.innerText = `${player.wins} Wins`;
  } else if (player === player2) {
  playerTwoWinCount.innerText = `${player.wins} Wins`;
  }
}

function incrementWins(player) {
  player.wins++;
}

function validTokenSpace(event) {
  var grid = parseInt(event.target.id);
  if (gameBoard[grid] === '') {
    return true;
  } else {
    return false;
  }
}

function winOrDrawGame(player) { 
  for (var i = 0; i < winCombo.length; i++) {
    var matchingCount = 0;
    for (var j = 0; j < winCombo[i].length; j++) {
      if (player.boxesTaken.includes(winCombo[i][j])) {
        matchingCount++;
      }
    }
    if (matchingCount === 3) {
      playersTurnHeading.innerText = `${currentPlayer.token} won!`;
      incrementWins(player);
      displayPlayerWins(player);
      restartGame();
      return player;
    }
  }
  if (player1.boxesTaken.length + player2.boxesTaken.length === 9) {
    playersTurnHeading.innerText = `It's a draw!`;
    restartGame();
  }
}

function restartGame() {
  setTimeout(function() {
    currentPlayer = switchPlayerTurn();
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    player1.boxesTaken = [];
    player2.boxesTaken = [];
    for (var i = 0; i < gridItems.length; i++) {
      gridItems[i].textContent = '';
    }
    displayHeadingTurn();
  }, 1000);
}

function createPlayer(token, id, wins) {
  return {
    token: token,
    id: id,
    wins: 0,
    isTurn: true,
    boxesTaken: []
  }
}