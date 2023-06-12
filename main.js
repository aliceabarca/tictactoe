var playerOneContainer = document.querySelector('.player-1-container');
var playerTwoContainer = document.querySelector('.player-2-container');
var gridItems = document.querySelectorAll('.grid-item');
var playersTurnHeading = document.querySelector('.players-turn');
var playerOneWinCount = document.querySelector('#player-one-win-count');
var playerTwoWinCount = document.querySelector(`#player-two-win-count`);
var ticTacToeGrid = document.querySelector('.tic-tac-toe-grid');
var row = document.querySelectorAll('.row');

var player1 = createPlayer('🥸', 'player 1', 0);
var player2 = createPlayer('🤖', 'player 2', 0);
var players = [player1, player2];
var currentPlayer = player1 || player2
var gameBoard = ['', '', '', '', '', '', '', '', ''];
var click = true;
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

ticTacToeGrid.addEventListener('click', function(event) {
  // switchTurn(event);
  // updateGame(event);
  displayTurn(event);
  // checkBox(event);
  // checkWin()
  // winGame()
  // checkBox(event);
});
ticTacToeGrid.addEventListener('click', updateGame);
ticTacToeGrid.addEventListener('click', checkBox);
window.addEventListener('load', startGame);

function startGame() {
  // player1.isTurn = true;
  // currentPlayer = player1;
  displayTurn();
  // checkBox();
  // switchTurn();
}

function switchTurn(event) {
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

function displayTurn(event) {
  if (player1.isTurn) {
    playersTurnHeading.innerText = `It's ${player1.token}'s turn.`;
    switchTurn();
  } else if (player2.isTurn) {
    playersTurnHeading.innerText = `It's ${player2.token}'s turn.`
    switchTurn();
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
      // displayTurn();
    }
  }
  // console.log(currentPlayer)
  // if its a winner restart game otherwise check for a draw else if continue with the game
// console.log('ja', currentPlayer)
function checkWin() {
  if (player1.isTurn) {
    winGame(player1)
    // incrementWins(player);
  } else if (player2.isTurn) {
    winGame(player2)
    // incrementWins(player);
   }
}

function updateGame(event) {
  var box = Array.from(gridItems).indexOf(event.target);
  if (gameBoard[box] === '') {
    gameBoard[box] = currentPlayer.token;
    event.target.textContent = currentPlayer.token;
  }
  // restartGame()
  // if (winGame()) {
  //   restartGame();
  //   return;
  // }
}


// create function that checks, win or draw, or none of the above.
// is it a draw if not keep playing
// is it a win if not keep playing
// win or draw restart game with the oppisite player to start
function incrementWins(player) {
  console.log(player)
  if (player === player1) {
    playerOneWinCount.innerText = `${player.wins} wins`
  } else if (player === player2) {
  playerTwoWinCount.innerText = `${player.wins} wins`
  }
}


function winGame(player) { 
  console.log(gameBoard)
  // console.log(currentPlaye)
  // currentPlayer = player.isTurn
  console.log(currentPlayer)
  for (var i = 0; i < winCombo.length; i++) {
    var matchingCount = 0;
    for (var j = 0; j < winCombo[i].length; j++) {
      if (player.boxesTaken.includes(winCombo[i][j])) {
        matchingCount++
      }
    }
    if (matchingCount === 3) {
      playersTurnHeading.innerText = `${currentPlayer.token} won!`
      player.wins++
      console.log(player.wins)
      incrementWins(player);
      restartGame();
      return player
    }
  }
  if (player1.boxesTaken.length + player2.boxesTaken.length === 9) {
    playersTurnHeading.innerText = `It's a draw!`;
    player.wins++
    restartGame();
    // updateGame();
    // setTimeout(function() {
    //   restartGame()
    // }, 8000);
    // return;
  }
}




function restartGame() {
  setTimeout(function() {
    // if (losingPlayer === player1) {
    //   currentPlayer = player2;
    // } else if (losingPlayer === player2) {
    //   currentPlayer = player1;
    // }
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    player1.boxesTaken = [];
    player2.boxesTaken = [];
    for (var i = 0; i < gridItems.length; i++) {
      gridItems[i].textContent = '';
    }
    displayTurn();
}, 4000);
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
